from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os
import time
import json
load_dotenv()
api_key=os.getenv("GEMINI_API_KEY")

class AnalyzeRequest(BaseModel):
    text: str

client=genai.Client(api_key=api_key)

app= FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)
@app.get("/")
def root():
    return {"mes":"RUnning"}

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    prompt=f""" Analyze this meeting transcript
       Return ONLY valid JSON.
       Do not include markdown.
       Do not include explanations.
       Do not wrap the response in triple backticks.
       write the summary like an elite executive assistant.

       Create a concise, visually polished meeting summary that feels like a premium Claude-style response.
       write the summary like an elite executive assistant.

       Create a concise, visually polished meeting summary that feels like a premium Claude-style response.


        {{
        "summary": "",
        "tasks": [
            {{
            "task": "",
            "priority": "High, Medium, or Low",
            "description": "",
            "date": "example: Nov 5,2026",
            "time": "XX:XX AM/PM",
            "duration": "e.g. 30 min, 1 hour, 2.5 hours"
            }}
        ]
        }}

        Transcript:{request.text}

    """
    response=client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )
    result=json.loads(response.text)
#     time.sleep(3)
#     result={
#   "summary": "The team reviewed project progress, discussed current blockers, and agreed on next steps. The authentication module is complete, dashboard designs have been finalized, and API integration is currently in progress.",
#   "tasks": [
#     {
#       "task": "Continue API integration for the authentication module",
#       "priority": "High",
#       "description": "Complete endpoint integration and verify authentication flows across all environments.",
#       "date": "June 18, 2026",
#       "time": "11:00 AM",
#       "duration": "2 hours"
#     },
#     {
#       "task": "Prepare responsive layouts for the dashboard",
#       "priority": "Medium",
#       "description": "Optimize dashboard components for mobile, tablet, and desktop screen sizes.",
#       "date": "June 18, 2026",
#       "time": "2:30 PM",
#       "duration": "3 hours"
#     },
#     {
#       "task": "Follow up with the backend team for API documentation",
#       "priority": "High",
#       "description": "Collect missing API specifications and clarify request/response formats.",
#       "date": "June 18, 2026",
#       "time": "9:15 AM",
#       "duration": "45 min"
#     }
#   ]
# }

    return result

@app.get("/test")
def test():
    response=client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello in one sentence"
    )

    return {"response":response.text}