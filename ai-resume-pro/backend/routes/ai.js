const express = require('express');
const router = express.Router();
const aiService = require('../services/ai');

/**
 * @route POST /api/resume/optimize
 * @desc Optimize resume based on tier
 * @access Public (for now, will be protected by auth later)
 */
router.post('/resume/optimize', async (req, res) => {
  const { resumeText, jobDescription, tier } = req.body;

  if (!resumeText || !tier) {
    return res.status(400).json({ error: 'Resume text and tier are required' });
  }

  try {
    const optimizedResume = await aiService.optimizeResume(resumeText, jobDescription || '', tier);
    res.json({ optimizedResume });
  } catch (error) {
    console.error('Route error in /resume/optimize:', error);
    res.status(500).json({ error: 'Failed to optimize resume' });
  }
});

/**
 * @route POST /api/cover-letter/generate
 * @desc Generate cover letter
 * @access Public
 */
router.post('/cover-letter/generate', async (req, res) => {
  const { resumeText, jobDescription, companyName } = req.body;

  if (!resumeText || !jobDescription || !companyName) {
    return res.status(400).json({ error: 'Resume text, job description, and company name are required' });
  }

  try {
    const coverLetter = await aiService.generateCoverLetter(resumeText, jobDescription, companyName);
    res.json({ coverLetter });
  } catch (error) {
    console.error('Route error in /cover-letter/generate:', error);
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
});

/**
 * @route GET /api/ai/test
 * @desc Health check for AI service
 * @access Public
 */
router.get('/ai/test', async (req, res) => {
  try {
    // Simple test to check if OpenAI is responsive
    const response = await aiService.optimizeResume('Test resume', 'Test job description', 'basic');
    res.json({ status: 'ok', message: 'AI service is working', sample: response });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
