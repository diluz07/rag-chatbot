from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import uvicorn
import os
from models import QueryRequest, QueryResponse, UploadResponse
from rag import RAGPipeline

# Metadata for Tags
tags_metadata = [
    {
        "name": "Chat",
        "description": "Operations for the RAG Chatbot (User facing).",
    },
    {
        "name": "Admin",
        "description": "Management operations (File Uploads) for Developers.",
    },
]

app = FastAPI(
    title="Amazonia RAG Support Bot",
    description="Backend API for the local RAG chatbot. Use the **Admin** endpoints to upload knowledge base documents.",
    version="1.0.0",
    docs_url="/docs",
    openapi_tags=tags_metadata,
    swagger_ui_parameters={
        "defaultModelsExpandDepth": -1,
        "layout": "BaseLayout"
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Pipeline
# We will initialize this on startup or lazily
rag = RAGPipeline()

@app.get("/", include_in_schema=False)
async def root():
    return {"message": "RAG Chatbot API is running"}

@app.get("/admin", include_in_schema=False)
async def admin_page():
    # Provide a beautiful UI for file uploads
    # In a real app, this might be protected by auth
    html_path = os.path.join(os.path.dirname(__file__), "admin.html")
    with open(html_path, "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

from typing import List

@app.post("/upload", response_model=List[UploadResponse], tags=["Admin"])
async def upload_document(files: List[UploadFile] = File(...)):
    results = []
    try:
        # Save temp file
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        
        for file in files:
            file_path = os.path.join(temp_dir, file.filename)
            
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
                
            # Process and ingest
            await rag.ingest_document(file_path)
            
            # Clean up
            os.remove(file_path)
            
            results.append(UploadResponse(filename=file.filename, status="Successfully ingrained in vector store"))
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query", response_model=QueryResponse, tags=["Chat"])
async def query_knowledge_base(request: QueryRequest):
    try:
        answer, sources = await rag.query(request.query)
        return QueryResponse(answer=answer, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
