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
    ".c", ".go", ".rs", ".md", ".txt", ".json", ".yaml", ".yml"
}

def parse_github_url(url: str):
    parts = url.rstrip("/").split("/")
    return parts[-2], parts[-1]

def fetch_repo_files(owner: str, repo: str, path: str = "") -> list[dict]:
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    
    items = response.json()


def fetch_from_url(github_url: str) -> list[dict]:
    owner, repo = parse_github_url(github_url)
    print(f"Fetching {owner}/{repo}...")
    files = fetch_repo_files(owner, repo)
    print(f"Fetched {len(files)} files")
    return files