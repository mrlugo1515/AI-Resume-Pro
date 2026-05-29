import OpenAI from "openai";

let _openai = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
}

function truncate(t, m = 12000) { return !t ? "" : t.length <= m ? t : t.substring(0, m) + "..."; }

export async function optimizeResume(text, jd, tier) {
  const t = truncate(text);
  const j = truncate(jd);
  let s = "", u = "";
  switch (tier) {
    case "basic": s = "You are a resume editor. Fix grammar, spelling, formatting."; u = "Proofread:\n" + t; break;
    case "keyword": s = "You are an ATS expert. Insert relevant keywords naturally."; u = "JD:\n" + j + "\n\nResume:\n" + t + "\n\nOptimize with keywords."; break;
    case "rewrite": s = "You are a career coach. Rewrite to match the job."; u = "JD:\n" + j + "\n\nResume:\n" + t + "\n\nFull rewrite."; break;
    default: throw new Error("Invalid tier");
  }
  const r = await getOpenAI().chat.completions.create({ model: "gpt-4o", messages: [{role:"system",content:s},{role:"user",content:u}], temperature: 0.7 });
  return r.choices[0].message.content;
}

export async function generateCoverLetter(text, jd, company) {
  const t = truncate(text);
  const j = truncate(jd);
  const r = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [{role:"system",content:"You are a cover letter writer."},{role:"user",content:"Company: "+company+"\nJD:\n"+j+"\nResume:\n"+t+"\nGenerate cover letter."}],
    temperature: 0.7
  });
  return r.choices[0].message.content;
}

export function extractKeywords(text) {
  if (!text) return [];
  const w = text.toLowerCase().split(/\W+/);
  const s = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","need","must","this","that","these","those","it","its","we","our","you","your","they","their","them","not","no","nor","so","if","then","than","too","very","just","about","above","after","again","all","also","any","because","been","before","being","both","each","few","more","most","other","some","such","only","own","same","into","over","under","up","out","off"]);
  const f = {};
  w.forEach(x => { if (x.length > 2 && !s.has(x)) f[x] = (f[x]||0)+1; });
  return Object.entries(f).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([k])=>k);
}
