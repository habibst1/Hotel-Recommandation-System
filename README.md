# 🏨 HotelMatch Tunisia

**HotelMatch Tunisia** is an AI-powered hotel recommendation assistant built specifically for **Tunisian hotels**.  
It helps travelers quickly decide whether a hotel matches their needs by analyzing **real guest reviews** and **hotel amenities**.

---

## 🎯 Use Case

Instead of scrolling through endless reviews, simply ask in natural language:

> *"Do you recommend Nour Palace Mahdia for a family with 4 kids, looking for good entertainment for children and high-quality service?"*

The system will:
1. Extract the hotel name from your query.
2. Match it against a curated database of Tunisian hotels.
3. Retrieve the hotel’s amenities and the **most relevant reviews for your case from the last 6 months**.
4. Run an **RAG pipeline** with a powerful LLM to give you a clear, data-driven recommendation:  
   ✅ *Recommended* or ❌ *Not Recommended* — with detailed reasoning.

---

## 🖼️ Demo

🎥 *(Insert your demo MP4/GIF here)*  

---

## 🖼️ Technical Demo

🎥 *(Insert your demo MP4/GIF here)*  

---

## ✨ Features

- 🔍 **Ask in natural language** → no filters, no dropdowns. Just type your preferences.  
- 🏨 **Hotel database** → scraped from TripAdvisor with up-to-date details and reviews.  
- 📊 **Context-aware answers** → considers both hotel info (amenities, type) and real guest experiences.  
- 💬 **Streaming chatbot** → recommendations arrive gradually, like a real conversation.  
- 👨‍👩‍👧‍👦 **Family-focused & flexible** → evaluate hotels for families, couples, quiet getaways, or budget stays.  
- 🌍 **Localized to Tunisia** → optimized for Tunisian hotels only.  

---

## 🛠️ How It Works

1. **Data Collection**  
   - Scraping hotel names, details, and reviews (last 6 months).  
   - Filtering and cleaning into JSON.  

2. **Data Preparation**  
   - Converted into Markdown for better chunking.  
   - Stored as embeddings inside a **Chroma vector database**.  

3. **Recommendation Pipeline**  
   - User query → hotel name extraction → retrieve relevant hotel info + reviews.  
   - RAG prompt construction with context + reviews.  
   - **Groq LLM** generates a final recommendation.  

4. **Frontend Experience**  
   - Built with **React + Tailwind CSS**.  
   - Chat-like interface with streaming responses.  
   - Showcase of popular Tunisian hotels ready for instant evaluation.  

---


## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: FastAPI, LangChain, Groq LLM  
- **Vector DB**: Chroma with HuggingFace embeddings (`all-MiniLM-L6-v2`)  
- **Data Pipeline**: Python notebooks for scraping, filtering, and preprocessing  

---

## 🚀 Example Questions

- *"Is Iberostar Royal El Mansour suitable for a couple’s luxury getaway?"*  
- *"Does TUI Blue Manar Hammamet have good activities for kids?"*  
- *"Is Sentido Marillia Hammamet a quiet hotel for relaxation?"*  

---

💡 With **HotelMatch Tunisia**, you don’t have to read hundreds of reviews — just ask, and get a clear recommendation backed by data.
