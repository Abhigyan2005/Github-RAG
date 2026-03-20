def chunk_file(file:dict, chunk_size:int = 1000, overlap: int=200)->list[dict]:
    i = 0
    content = clean_content(file["content"])
    j = len(content)

    chunks=[]
    while i<j:
        piece = content[i: i+chunk_size]
        chunks.append({
            "path": file["path"],
            "chunk_id": len(chunks),
            "content": piece
        })
        i+= chunk_size - overlap
    
    return chunks


def chunk_files(files: list[dict]) -> list[dict]:
    all_chunks = []
    for file in files:
        all_chunks.extend(chunk_file(file))
    return all_chunks

def clean_content(content: str) -> str:
    lines = content.split("\n")

    newContent = []
    for line in lines:
        if line.strip() != "":
            newContent.append(line)

    return "\n".join(newContent)
