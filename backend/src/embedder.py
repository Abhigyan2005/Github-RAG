from sentence_transformers import SentenceTransformer
import chromadb

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="github_rag")

def store_chunks(chunks: list[dict]):
    for chunk in chunks:
        id = chunk['path']+"_" + str(chunk["chunk_id"]) 
        vector = model.encode(chunk['content'])
        collection.add(
            ids=[id],
            embeddings=[vector],
            documents=[chunk["content"]]
        )

def search_chunks(question: str, n_results: int = 5) -> list[str]:
    vector  = model.encode(question)
    results = collection.query(
        query_embeddings=[vector .tolist()],
        n_results=n_results
    )
    return results["documents"][0]


def clear_collection():
    client.delete_collection("github_rag")
    global collection
    collection = client.get_or_create_collection(name="github_rag")
    
