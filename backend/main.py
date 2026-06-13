from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os
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


        {{
        "summary": "",
        "tasks": [
            {{
            "task": "",
            "priority": ""
            }}
        ]
        }}

        Transcript:{request.text}

    """
    # response=client.models.generate_content(
    #     model="gemini-2.5-flash",
    #     contents=prompt
    # )
    # result=json.loads(response.text)
    result={
  "summary": "The team reviewed project progress, discussed current blockers, and agreed on next steps. The authentication module is complete, dashboard designs have been finalized, and API integration is currently in progress.",
  "tasks": [
    {
      "task": "Continue API integration for the authentication module",
      "priority": "High"
    },
    {
      "task": "Prepare responsive layouts for the dashboard",
      "priority": "Medium"
    },
    {
      "task": "Follow up with the backend team for API documentation",
      "priority": "High"
    }
  ]
}
    return result

@app.get("/test")
def test():
    response=client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello in one sentence"
    )

    return {"response":response.text}