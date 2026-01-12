# Project Technical Overview: Amazonia RAG Chatbot

This document lists all technologies, applications, and requirements used to build this local RAG (Retrieval-Augmented Generation) chatbot.

## 1. Core Applications
You interact with these directly to run the project.
*   **Ollama**: The local AI server that runs the Llama 3 model.
*   **Python (3.10+)**: The programming language for the backend API.
*   **Node.js (v18+)**: The runtime environment for the React frontend.
*   **Google Chrome / Browser**: To view the storefront and chat.

## 2. Artificial Intelligence (AI) Stack
These components provide the "Intelligence".
*   **LLM (Large Language Model)**: `llama3` (Runs locally via Ollama).
    *   *Role*: Generates the natural language answers.
*   **Embeddings Model**: `nomic-embed-text` (Runs locally via Ollama).
    *   *Role*: Converts your PDF text into mathematical vectors for searching.
*   **Vector Database**: `ChromaDB`.
    *   *Role*: Stores the "memory" of your uploaded documents so the AI can search them incredibly fast.

## 3. Backend (API) Stack
Located in `/backend`. Built with Python.
*   **FastAPI**: The web framework that creates the API endpoints (`/query`, `/upload`).
*   **LangChain**: The framework that connects the PDF loader, the Database, and the LLM together.
*   **Uvicorn**: The high-performance server that runs the Python application.
*   **PyPDF**: Library used to read text from uploaded PDF files.

## 4. Frontend (UI) Stack
Located in `/frontend`. Built with JavaScript/React.
*   **React (Vite)**: The modern library for building the user interface.
*   **Tailwind CSS**: The utility-first CSS framework used for styling (gradients, spacing, layout).
*   **Framer Motion**: The library used for the smooth scroll animations and the "pulsating orb" effect.
*   **Lucide React**: Provides the icons (Paperclip, Sparkles, X button).
*   **Axios**: Handles the HTTP requests sent from the browser to the Python backend.

## 5. System Requirements
To run this project on another machine, it needs:
1.  **Hardware**: Apple Silicon (M1/M2/M3) OR a PC with a decent GPU (8GB+ RAM recommended for Llama 3).
2.  **Software**: 
    *   Ollama installed and running.
    *   Python and Node.js installed.
