import requests
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

ALLOWED_EXTENSIONS = {
    ".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".cpp",
    ".c", ".go", ".rs", ".md", ".txt", ".json", ".yaml", ".yml", ".html", ".css"
}

def parse_github_url(url: str):
    parts = url.rstrip("/").split("/")
    return parts[-2], parts[-1]

def fetch_repo_files(owner: str, repo: str, path: str = "") -> list[dict]:
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    
    items = response.json()
    
    files = []
    for item in items:
        if item["type"] == "file":
            ext = os.path.splitext(item["name"])[1].lower()
            if ext in ALLOWED_EXTENSIONS:
                file_response = requests.get(item["download_url"])
                files.append({
                    "path": item["path"],
                    "content": file_response.text
                })

        elif item["type"] == "dir":
            files.extend(fetch_repo_files(owner, repo, item["path"]))
    return files
            
def fetch_from_url(github_url: str) -> list[dict]:
    owner, repo = parse_github_url(github_url)
    print(f"Fetching {owner}/{repo}...")
    files = fetch_repo_files(owner, repo)
    print(f"Fetched {len(files)} files")
    return files

if __name__ == "__main__":
    files = fetch_from_url("https://github.com/Abhigyan2005/twogoodcomFrontend")
    print(f"Total files: {len(files)}")
    print(f"First file path: {files[0]['path']}")
    print(f"First file content preview: {files[0]['content']}")