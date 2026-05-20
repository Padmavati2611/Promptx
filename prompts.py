import json
from schemas.request import GenerateRequest
# ── System prompt ─────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are an expert technical resume writer specializing in software engineering roles.
Generate a JS0N response using the following schema:
Schema:
{
  "career_objective": "string",
  "technical_skills": [
    "string",
    "string"
  ],
  "projects": [
    {
      "project_name": "string",
      "optimized_summary": "string",
      "technologies": ["string"],
      "key_features": [
        "string",
        "string"
      ]
    }
  ]
}
"""
# ── User prompt builder ───────────────────────────────────────────────────────
def build_resume_prompt(payload: GenerateRequest) -> tuple[str, str]:
    """
    Build the (system_prompt, user_prompt) tuple for the OpenAI chat call.
    Returns
    -------
    tuple[str, str]
        (system_prompt, user_message)
    """
    projects_block = "\n\n".join(
        f"Project {i + 1}:\n"
        f"  Name        : {p.project_name}\n"
        f"  Description : {p.project_description}\n"
        f"  Tech Stack  : {p.tech_stack}"
        for i, p in enumerate(payload.projects)
    )
    user_message = (
        f"Analyse the following candidate project portfolio and generate ATS-optimized resume content.\n\n"
        f"=== PROJECTS ({len(payload.projects)}) ===\n"
        f"{projects_block}\n\n"
        f"=== WORK EXPERIENCE ===\n"
        f"{payload.work_experience}\n\n"
        f"Return STRICT valid JSON only."
    )
    return SYSTEM_PROMPT, user_message