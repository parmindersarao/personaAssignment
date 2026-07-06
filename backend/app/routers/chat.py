from fastapi import APIRouter, Depends
from pydantic import BaseModel
from openai import OpenAI
from app.security import verify_api_key, limiter
from app.persona import PERSONAS
from app.config import MODEL_API_KEY
from fastapi import Request

router = APIRouter()
client = OpenAI(api_key = MODEL_API_KEY)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    persona_id: str
    message: str
    history: list[Message]=[]


@router.get("/personas")
def list_personas(_: None = Depends(verify_api_key)):
    return {pid: {"name": p["name"]} for pid, p in PERSONAS.items()}


@router.post("/chat")
@limiter.limit("10/minute")
def chat_endpoint(request: Request, body: ChatRequest, _: None = Depends(verify_api_key)):
    persona = PERSONAS.get(body.persona_id)
    if not persona:
        return{"error":"Invalid persona_id"}
    message=[{"role":"system", "content": persona["system_prompt"]}]
    for m in body.history:
        message.append({"role": m.role, "content": m.content})
    message.append({"role":"user", "content":body.message})

    response = client.chat.completions.create(
        model = "gpt-5.4-mini",
        messages = message
    )
    
    reply = response.choices[0].message.content
    return {"reply": reply }