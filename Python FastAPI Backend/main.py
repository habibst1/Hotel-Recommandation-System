# main.py
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
from typing import Dict, List, Optional, Any
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.prompts import PromptTemplate
import warnings
import re
from typing import Dict, Any
from fastapi.responses import StreamingResponse
import asyncio
import json
warnings.filterwarnings("ignore")
# 🔐 Set API Keys
os.environ["GROQ_API_KEY"] = "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"
# Initialize components
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")  # Groq doesn't provide embeddings, so use HF
llm = ChatGroq(model="openai/gpt-oss-20b", temperature=0.3)  # Groq model
# Load existing vector store
vectorstore = Chroma(persist_directory="../3_Vector Storage/chroma_store", embedding_function=embedding)
# Global variable for logging
pipeline_log = []
app = FastAPI()
# Request model
class QueryRequest(BaseModel):
    query: str

# Response models
class QueryResponse(BaseModel):
    answer: str
    log: list

class TechnicalStep(BaseModel):
    step: str
    details: Optional[Any] = None
    prompt: Optional[str] = None
    raw_response: Optional[str] = None

class TechnicalDemoResponse(BaseModel):
    user_query: str
    hotel_name: Optional[str] = None
    context_chunks_count: int = 0
    review_chunks_count: int = 0
    steps: List[TechnicalStep] = []
    final_answer: str
    pipeline_log: List[str] = []


def log_message(message: str, print_immediately: bool = False):
    pipeline_log.append(message)
    if print_immediately:
        print(message)

def retrieve_hotel_name(query: str) -> str:
    log_message(f"\n🔍 Searching for hotel matching: '{query}'")
    docs = vectorstore.similarity_search(query, k=1000)
    hotel_docs = [doc for doc in docs if "Hotel Name" in doc.metadata and "Section" not in doc.metadata]
    log_message(f"\n🏨 Found {len(hotel_docs)} non-section hotel documents:")
    if not hotel_docs:
        log_message("\n❌ No valid hotel documents found (all had sections)")
        return None
    return hotel_docs[0].metadata["Hotel Name"]

def retrieve_hotel_info(hotel_name: str, query: str) -> dict:
    k = 30
    while k > 0:
        try:
            all_chunks = vectorstore.similarity_search("", k=k, filter={"Hotel Name": hotel_name})
            all_relevant_chunks = vectorstore.similarity_search(query, k=k, filter={"Hotel Name": hotel_name})
            break
        except RuntimeError as e:
            if "Cannot return the results in a contigious 2D array" in str(e):
                k -= 1
            else:
                raise
    hotel_context_chunks = [
        chunk for chunk in all_chunks 
        if ("Section" not in chunk.metadata) or (chunk.metadata["Section"] != "💬 Reviews")
    ]
    reviews_chunks = [
        chunk for chunk in all_relevant_chunks 
        if chunk.metadata.get("Section") == "💬 Reviews"
    ]
    return {
        "hotel_context_chunks": hotel_context_chunks,
        "reviews_chunks": reviews_chunks
    }

# Prompts
EXTRACT_HOTEL_CONTEXT = """You are a helpful hotel information extractor. Given the following hotel data chunks, extract hotel context that would be relevant for {user_query}.
Return your response in this format:
Hotel Context: <extracted context>
hotel data chunks:
{hotel_data}
"""
EXTRACT_HOTEL_REVIEWS = """You are a helpful hotel reviews extractor. Given the following hotel review chunks, extract the most relevant recent reviews that address {user_query}.
Return your response in this format:
Relevant latest Reviews: <extracted reviews>
hotel review chunks:
{review_data}
"""
FINAL_ANSWER_TEMPLATE = """You are a knowledgeable hotel concierge. Help the user with their query by considering:
User Query: {user_query}
Hotel Context:
{hotel_context}
Relevant Reviews:
{hotel_reviews}
Provide a detailed, helpful response that addresses the user's specific needs.
-Never recommend to read more reviews.
-Don't recommend other hotels based on your knowledge.
"""

extract_hotel_context_prompt = PromptTemplate.from_template(EXTRACT_HOTEL_CONTEXT)
extract_hotel_reviews_prompt = PromptTemplate.from_template(EXTRACT_HOTEL_REVIEWS)
final_answer_prompt = PromptTemplate.from_template(FINAL_ANSWER_TEMPLATE)


def hotel_recommendation_chain_technical(query: str) -> dict:
    """Executes the hotel recommendation chain and returns detailed technical steps."""
    global pipeline_log
    pipeline_log = []
    steps_log = []
    
    log_message("\n" + "="*50)
    log_message("🔍 Starting Hotel Recommendation Pipeline")
    log_message(f"📝 User Query: '{query}'")
    steps_log.append(TechnicalStep(step="Pipeline Started", details={"user_query": query}))

    # Step 1: Find Hotel Name
    hotel_name = retrieve_hotel_name(query)
    if not hotel_name:
        log_message("❌ No hotel found matching the query")
        steps_log.append(TechnicalStep(step="Hotel Name Extraction", details={"status": "Not Found", "message": "No hotel found matching the query"}))
        return {
            "user_query": query,
            "hotel_name": None,
            "context_chunks_count": 0,
            "review_chunks_count": 0,
            "steps": steps_log,
            "final_answer": "I couldn't find information about that hotel. Please check the name and try again.",
            "pipeline_log": pipeline_log.copy()
        }
    
    log_message(f"✅ Found Hotel: {hotel_name}")
    steps_log.append(TechnicalStep(step="Hotel Name Extraction", details={"status": "Found", "hotel_name": hotel_name}))

    # Step 2: Retrieve Hotel Info
    chunks_dict = retrieve_hotel_info(hotel_name, query)
    hotel_context_chunks = chunks_dict["hotel_context_chunks"]
    reviews_chunks = chunks_dict["reviews_chunks"]
    
    context_count = len(hotel_context_chunks)
    review_count = len(reviews_chunks)
    
    log_message(f"\n📚 Retrieved chunks about {hotel_name}:")
    log_message(f"- {context_count} context chunks")
    log_message(f"- {review_count} review chunks")
    
    steps_log.append(TechnicalStep(
        step="Information Retrieval",
        details={
            "hotel_name": hotel_name,
            "context_chunks_retrieved": context_count,
            "review_chunks_retrieved": review_count
        }
    ))

    if not hotel_context_chunks and not reviews_chunks:
        log_message(f"❌ Found hotel {hotel_name} but no details available")
        steps_log.append(TechnicalStep(step="Error", details={"message": f"Found hotel {hotel_name} but no details available"}))
        return {
            "user_query": query,
            "hotel_name": hotel_name,
            "context_chunks_count": context_count,
            "review_chunks_count": review_count,
            "steps": steps_log,
            "final_answer": f"I found {hotel_name} but couldn't retrieve any details about it.",
            "pipeline_log": pipeline_log.copy()
        }

    # Prepare data for LLMs
    hotel_context_data = "\n".join(
        f"{chunk.metadata.get('Section', 'General Information')}:\n{chunk.page_content}"
        for chunk in hotel_context_chunks
    )
    review_data = "\n".join(
        f"{chunk.metadata.get('Review')}:\n{chunk.page_content}"
        for chunk in reviews_chunks
    ) if reviews_chunks else "No reviews available"

    # Step 3: Extract Hotel Context
    context_chain = extract_hotel_context_prompt | llm
    context_prompt_text = extract_hotel_context_prompt.format(user_query=query, hotel_data=hotel_context_data)
    context_result = context_chain.invoke({"user_query": query, "hotel_data": hotel_context_data})
    hotel_context = context_result.content.split("Hotel Context:")[-1].strip()
    
    steps_log.append(TechnicalStep(
        step="Extract Hotel Context relevant to user's prompt from context_chunks_retrieved (LLM Call 1)",
        prompt=context_prompt_text,
        raw_response=context_result.content,
        details={"extracted_context_length": len(hotel_context)}
    ))

    # Step 4: Extract Reviews
    reviews_chain = extract_hotel_reviews_prompt | llm
    reviews_prompt_text = extract_hotel_reviews_prompt.format(user_query=query, review_data=review_data)
    reviews_result = reviews_chain.invoke({"user_query": query, "review_data": review_data})
    hotel_reviews = reviews_result.content.split("Relevant latest Reviews:")[-1].strip()
    
    steps_log.append(TechnicalStep(
        step="Extract Relevant Reviews to user's prompt from review_chunks_retrieved (LLM Call 2)",
        prompt=reviews_prompt_text,
        raw_response=reviews_result.content,
        details={"extracted_reviews_length": len(hotel_reviews)}
    ))

    # Step 5: Generate Final Answer
    final_prompt_text = final_answer_prompt.format(
        user_query=query,
        hotel_context=hotel_context,
        hotel_reviews=hotel_reviews
    )
    final_answer = (final_answer_prompt | llm).invoke({
        "user_query": query,
        "hotel_context": hotel_context,
        "hotel_reviews": hotel_reviews
    })
    
    steps_log.append(TechnicalStep(
        step="Final Answer Generation (LLM Call 3)",
        prompt=final_prompt_text,
        raw_response=final_answer.content,
        details={"final_answer_length": len(final_answer.content)}
    ))

    log_message("\n" + "="*50)
    log_message("✅ Pipeline Complete")
    
    return {
        "user_query": query,
        "hotel_name": hotel_name,
        "context_chunks_count": context_count,
        "review_chunks_count": review_count,
        "steps": steps_log,
        "final_answer": final_answer.content,
        "pipeline_log": pipeline_log.copy()
    }
# --- End Technical Chain Function ---

def hotel_recommendation_chain(query: str) -> str:
    global pipeline_log
    pipeline_log = []
    log_message("\n" + "="*50)
    log_message("🔍 Starting Hotel Recommendation Pipeline")
    log_message(f"📝 User Query: '{query}'")
    hotel_name = retrieve_hotel_name(query)
    if not hotel_name:
        log_message("❌ No hotel found matching the query")
        return "I couldn't find information about that hotel. Please check the name and try again."
    log_message(f"✅ Found Hotel: {hotel_name}")
    chunks_dict = retrieve_hotel_info(hotel_name, query)
    hotel_context_chunks = chunks_dict["hotel_context_chunks"]
    reviews_chunks = chunks_dict["reviews_chunks"]
    if not hotel_context_chunks and not reviews_chunks:
        log_message(f"❌ Found hotel {hotel_name} but no details available")
        return f"I found {hotel_name} but couldn't retrieve any details about it."
    hotel_context_data = "\n".join(
        f"{chunk.metadata.get('Section', 'General Information')}:\n{chunk.page_content}"
        for chunk in hotel_context_chunks
    )
    review_data = "\n".join(
        f"{chunk.metadata.get('Review')}:\n{chunk.page_content}"
        for chunk in reviews_chunks
    ) if reviews_chunks else "No reviews available"
    log_message(f"\n📚 Retrieved chunks about {hotel_name}:")
    log_message(f"- {len(hotel_context_chunks)} context chunks")
    log_message(f"- {len(reviews_chunks)} review chunks")
    context_chain = extract_hotel_context_prompt | llm
    context_result = context_chain.invoke({"user_query": query, "hotel_data": hotel_context_data})
    hotel_context = context_result.content.split("Hotel Context:")[-1].strip()
    reviews_chain = extract_hotel_reviews_prompt | llm
    reviews_result = reviews_chain.invoke({"user_query": query, "review_data": review_data})
    hotel_reviews = reviews_result.content.split("Relevant latest Reviews:")[-1].strip()
    final_answer = (final_answer_prompt | llm).invoke({
        "user_query": query,
        "hotel_context": hotel_context,
        "hotel_reviews": hotel_reviews
    })
    log_message("\n" + "="*50)
    log_message("✅ Pipeline Complete")
    return final_answer.content

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recommend-hotel", response_model=QueryResponse)
async def recommend_hotel(request: QueryRequest):
    answer = hotel_recommendation_chain(request.query)
    return {"answer": answer, "log": pipeline_log.copy()}

@app.post("/recommend-hotel-technical", response_model=TechnicalDemoResponse)
async def recommend_hotel_technical(request: QueryRequest):
    """Endpoint for the technical demo, returning detailed steps and data."""
    result = hotel_recommendation_chain_technical(request.query)
    return result

# The streaming endpoint
@app.post("/recommend-hotel-stream")
async def recommend_hotel_stream(request: QueryRequest):
    async def generate_response():
        try:
            # Get the full response
            answer = hotel_recommendation_chain(request.query)
            # Clean up the answer to ensure proper line breaks
            # Replace any literal <br> tags with actual newlines
            cleaned_answer = answer.replace('<br>', '\n').replace('<br/>', '\n').replace('\\n', '\n')
            # Split the response into chunks for streaming
            chunk_size = 50
            # Split by sentences/paragraphs for more natural streaming
            import re
            # Split on sentence endings, newlines, or every 30 words
            sentences = re.split(r'([.!?]\s+|\n+)', cleaned_answer)
            full_text = ""
            i = 0
            while i < len(sentences):
                # Combine sentence with its punctuation
                chunk = ""
                if i < len(sentences):
                    chunk += sentences[i]
                    if i + 1 < len(sentences):
                        chunk += sentences[i + 1]
                        i += 2
                    else:
                        i += 1
                else:
                    i += 1
                if chunk.strip():
                    full_text += chunk
                    # Yield the chunk
                    yield f"data: {json.dumps({'text': chunk, 'completed': False})}\n"
                    await asyncio.sleep(0.1)  # Small delay for realistic streaming
            # Send completion signal
            yield f"data: {json.dumps({'text': '', 'completed': True, 'log': pipeline_log.copy()})}\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n"
    return StreamingResponse(generate_response(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)