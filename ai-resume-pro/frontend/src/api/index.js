const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Login failed');
  }
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Registration failed');
  }
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  return res.json();
}

export async function optimizeResume(resumeText, jobDescription, tier) {
  const res = await fetch(`${API_BASE}/resume/optimize`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ resumeText, jobDescription, tier }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to optimize resume');
  }
  return res.json();
}

export async function generateCoverLetter(resumeText, jobDescription, companyName) {
  const res = await fetch(`${API_BASE}/cover-letter/generate`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ resumeText, jobDescription, companyName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate cover letter');
  }
  return res.json();
}

export async function testAiService() {
  const res = await fetch(`${API_BASE}/ai/test`);
  if (!res.ok) {
    throw new Error('AI service unavailable');
  }
  return res.json();
}