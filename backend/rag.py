import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load environment variables
load_dotenv()

class RAGPipeline:
    def __init__(self):
        self.persist_directory = "./chroma_db"
        
        # Setup Vector Store with Ollama Embeddings (Nomic is highly efficient)
        # Make sure to run `ollama pull nomic-embed-text` in your terminal
        self.embeddings = OllamaEmbeddings(model="nomic-embed-text")
        
        # Initialize Vector Store
        self.vector_store = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings,
            collection_name="rag_collection"
        )
        
        # Setup LLM (Ollama - Llama 3 8B)
        self.llm = ChatOllama(model="llama3", temperature=0)
        
        # Create retrieval chain components
        self.retriever = self.vector_store.as_retriever(search_kwargs={"k": 5})
        
        system_prompt = (
            "You are a helpful customer support assistant. "
            "Use the following pieces of retrieved context to answer "
            "the question. "
            "Answer directly and naturally. Do NOT start your answer with phrases like "
            "'According to the context', 'Based on the document', or 'The text states'. "
            "Just give the answer as if you know it. "
            "If you don't know the answer, say that you don't know. "
            "Use three sentences maximum and keep the answer concise. "
            "\n\n"
            "{context}"
        )
        
        self.prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                ("human", "{input}"),
            ]
        )
        
        self.question_answer_chain = create_stuff_documents_chain(self.llm, self.prompt)
        self.rag_chain = create_retrieval_chain(self.retriever, self.question_answer_chain)

    async def ingest_document(self, file_path: str):
        # Determine loader
        if file_path.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
        else:
            loader = TextLoader(file_path)
            
        docs = loader.load()
        
        # Split documents
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        
        # Add to vector store
        self.vector_store.add_documents(documents=splits)
        
    async def query(self, query: str):
        response = self.rag_chain.invoke({"input": query})
        answer = response["answer"]
        sources = [doc.metadata.get("source", "unknown") for doc in response["context"]]
        # Deduplicate sources
        sources = list(set(sources))
        return answer, sources

    async def clear_knowledge_base(self):
        # Delete the existing collection
        self.vector_store.delete_collection()
        
        # Re-initialize the vector store to start fresh
        self.vector_store = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings,
            collection_name="rag_collection"
        )
        
        # Re-initialize the retriever and chains with the fresh store
        self.retriever = self.vector_store.as_retriever(search_kwargs={"k": 5})
        self.rag_chain = create_retrieval_chain(self.retriever, self.question_answer_chain)
        return True
