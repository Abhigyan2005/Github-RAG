from dotenv import load_dotenv
import os
from src.embedder import search_chunks
from google import genai
from google.genai import errors as genai_errors

load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_KEY)
def ask(question: str) -> str:
    chunks = search_chunks(question, 5)
    context = "\n".join(chunks)
    prompt = f"You are a code assistant. Use these code chunks to answer the question.\n\nCode:\n{context}\n\nQuestion: {question}"
    response = client.models.generate_content(
        model="gemini-3-flash-preview", contents=prompt
    )
    
    return response.text

