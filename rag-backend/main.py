from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.fetcher import fetch_from_url
from src.chunker import chunk_files
from src.embedder import store_chunks
from src.embedder import clear_collection
from src.rag import ask
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class IndexRequest(BaseModel):
    github_url: str

class AskRequest(BaseModel):
    question: str

@app.post("/index")
def index_repo(body: IndexRequest):
    clear_collection()
    file = fetch_from_url(body.github_url)
    chunks = chunk_files(file)
    store_chunks(chunks)

    return { "message": f"Indexed {len(chunks)} chunks", "chunks_count": len(chunks) }


@app.post("/ask")
def ask_question(body: AskRequest):
    answer = ask(body.question)

    return {"answer": answer }


