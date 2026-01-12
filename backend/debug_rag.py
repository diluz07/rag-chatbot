import asyncio
import os
from rag import RAGPipeline

async def test_ingest():
    # Create a dummy file
    with open("test.txt", "w") as f:
        f.write("This is a test document for the RAG chatbot.")
    
    try:
        print("Initializing RAG Pipeline...")
        rag = RAGPipeline()
        print("RAG Pipeline Initialized.")
        
        print("Ingesting document...")
        await rag.ingest_document("test.txt")
        print("Ingestion successful!")
        
    except Exception as e:
        print("\n--- ERROR DETECTED ---")
        print(e)
        import traceback
        traceback.print_exc()
    finally:
        if os.path.exists("test.txt"):
            os.remove("test.txt")

if __name__ == "__main__":
    asyncio.run(test_ingest())
