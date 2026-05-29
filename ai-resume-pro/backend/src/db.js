/**
 * Database access layer for AI Resume Pro.
 * Uses the team-db CLI which syncs with Turso (libSQL).
 *
 * Every call pulls from Turso, executes, and pushes. Output is always JSON.
 *
 * Usage:
 *   import db from './db.js';
 *   const users = await db.query("SELECT * FROM users WHERE email = ?", ["test@example.com"]);
 *   await db.execute("INSERT INTO users (email, password_hash) VALUES (?, ?)", ["a@b.com", "hash"]);
 */

import { execSync } from 'child_process';

/**
 * Escape/sanitize a string value for safe use in a SQL string.
 * @param {string} value
 * @returns {string}
 */
function escape(value) {
  if (value === null || value === undefined) return 'NULL';
  const str = String(value);
  // SQLite escaping: replace single quotes with two single quotes
  return `'${str.replace(/'/g, "''")}'`;
}

/**
 * Execute a SQL query using team-db and return parsed JSON results.
 * For SELECT queries, returns rows. For INSERT/UPDATE/DELETE, returns result info.
 *
 * IMPORTANT: team-db only supports ONE SQL statement per call.
 *
 * @param {string} sql - The SQL statement (use ? for positional params)
 * @param {Array} params - Array of parameter values to safely inject
 * @returns {Promise<Array|Object>} - Query results
 */
async function query(sql, params = []) {
  // Build safe SQL by injecting params
  let safeSql = sql;
  let paramIndex = 0;
  safeSql = safeSql.replace(/\?/g, () => {
    if (paramIndex >= params.length) return '?';
    return escape(params[paramIndex++]);
  });

  try {
    const stdout = execSync(`team-db "${safeSql.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
      timeout: 30000,
    });
    return JSON.parse(stdout.trim());
  } catch (err) {
    // team-db prints errors to stderr but also returns JSON on stdout
    try {
      if (err.stdout) {
        return JSON.parse(err.stdout.trim());
      }
    } catch {
      // Not JSON output
    }
    throw new Error(`Database error: ${err.stderr || err.message}`);
  }
}

/**
 * Execute a write operation (INSERT, UPDATE, DELETE).
 * Alias for query for readability.
 */
async function execute(sql, params = []) {
  return query(sql, params);
}

/**
 * Get a single row by ID from a table.
 * @param {string} table - Table name
 * @param {string} id - UUID
 * @returns {Promise<Object|null>}
 */
async function getById(table, id) {
  const rows = await query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Insert a row into a table.
 * @param {string} table - Table name
 * @param {Object} data - Column-value pairs
 * @returns {Promise<Object>} - The inserted row (with id)
 */
async function insert(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  const cols = keys.join(', ');

  // If no id provided, let the default generate one
  if (!data.id) {
    // We need to retrieve the generated id
    await query(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`, values);
    // Get the last inserted row (SQLite's last_insert_rowid doesn't work with Turso sync)
    // So we query for the most recent row matching our data
    // For simplicity, include all values in WHERE
    const whereClauses = keys.map(k => `${k} = ?`).join(' AND ');
    const rows = await query(`SELECT * FROM ${table} WHERE ${whereClauses} ORDER BY rowid DESC LIMIT 1`, values);
    return rows[0] || { ...data };
  }

  await query(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`, values);
  return { id: data.id, ...data };
}

/**
 * Update a row by ID.
 * @param {string} table - Table name
 * @param {string} id - Row ID
 * @param {Object} data - Column-value pairs to update
 * @returns {Promise<void>}
 */
async function update(table, id, data) {
  const keys = Object.keys(data);
  const setClauses = keys.map(k => `${k} = ?`).join(', ');
  const values = [...Object.values(data), id];
  await query(`UPDATE ${table} SET ${setClauses} WHERE id = ?`, values);
}

/**
 * Delete a row by ID.
 * @param {string} table - Table name
 * @param {string} id - Row ID
 * @returns {Promise<void>}
 */
async function remove(table, id) {
  await query(`DELETE FROM ${table} WHERE id = ?`, [id]);
}

export default {
  query,
  execute,
  getById,
  insert,
  update,
  remove,
};