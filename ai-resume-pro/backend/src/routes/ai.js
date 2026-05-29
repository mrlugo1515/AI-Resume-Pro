import { Router } from "express";
import { optimizeResume, generateCoverLetter } from "../services/ai.js";
import { authMiddleware } from "../middleware/auth.js";

export const aiRouter = Router();

// Public: test endpoint
aiRouter.get("/ai/test", async (req, res) => {
  try {
    const hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-");
    if (!hasApiKey) return res.json({ status: "mock", message: "AI service running in mock mode. Set OPENAI_API_KEY for real AI responses." });
    const response = await optimizeResume("Test resume", "Test job", "basic");
    res.json({ status: "ok", message: "AI service is working", sample: response });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// All routes below require authentication
aiRouter.use(authMiddleware);

aiRouter.post("/resume/optimize", async (req, res) => {
  try {
    const { resumeText, jobDescription, tier = "basic" } = req.body;
    if (!resumeText || !jobDescription) return res.status(400).json({ error: "Resume and job description are required" });
    const optimizedResume = await optimizeResume(resumeText, jobDescription, tier);
    res.json({ optimizedResume });
  } catch (error) {
    console.error("Error in /resume/optimize:", error);
    res.status(500).json({ error: "Failed to optimize resume" });
  }
});

aiRouter.post("/cover-letter/generate", async (req, res) => {
  try {
    const { resumeText, jobDescription, companyName } = req.body;
    if (!resumeText || !jobDescription || !companyName) return res.status(400).json({ error: "Resume text, job description, and company name are required" });
    const coverLetter = await generateCoverLetter(resumeText, jobDescription, companyName);
    res.json({ coverLetter });
  } catch (error) {
    console.error("Error in /cover-letter/generate:", error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});
