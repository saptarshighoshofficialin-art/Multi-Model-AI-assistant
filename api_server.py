import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

token = os.getenv("GITHUB_TOKEN")
if not token:
    raise Exception("API token missing")

MODELS = {
    "4o": "gpt-4o",
    "4omini": "gpt-4o-mini"
}

current_model = MODELS["4o"]
client = OpenAI(base_url="https://models.inference.ai.azure.com", api_key=token)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify front-end URLs
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message")

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": user_message}
    ]

    response = client.chat.completions.create(
        messages=messages,
        model=current_model,
        temperature=1,
        max_tokens=4096,
        top_p=1
    )

    reply = response.choices[0].message.content.strip()
    return {"reply": reply}
