
# Hotel Recommendation System

## Overview
This project develops a recommendation system for hotels in Tunisia by scraping hotel data and reviews from TripAdvisor, processing the data to filter out deceptive reviews, and using Retrieval-Augmented Generation (RAG) to provide personalized hotel recommendations. The system focuses on Tunisian hotels due to resource constraints, with plans for future expansion.

## Repository Structure
The project is organized into four main directories, each containing a Jupyter notebook that handles a specific part of the pipeline:

### 1. Scraping and Filtering
- **1_Scraping No Details No Reviews.ipynb**: Scrapes basic information (e.g., hotel names and links) for all Tunisian hotels listed on TripAdvisor.
- **2_Scraping Details.ipynb**: Accesses each hotel's TripAdvisor page using the links from the previous step to extract detailed information, such as location, rating, description, property amenities, room features, room types, hotel class, languages spoken, and hotel style.
- **3_Scraping Reviews.ipynb**: Collects the latest 30 reviews for each hotel from TripAdvisor.
- **4_Filtering Reviews.ipynb**: Uses a fine-tuned BERT model to filter out deceptive reviews, retaining only truthful reviews for further processing.

**Output Data Format**:
The processed data is structured as follows:
```json
{
    "name": "...",
    "link": "...",
    "country": "...",
    "location": "...",
    "rating": "..",
    "num_reviews": ..,
    "hotel_number": ..,
    "description": "...",
    "property_amenities": [
        ...
    ],
    "room_features": [
        ...
    ],
    "room_types": [
        ...
    ],
    "hotel_class": "...",
    "languages_spoken": [
        ...
    ],
    "hotel_style": [
        ...
    ],
    "reviews": [
        ...
    ]
}
```

### 2. JSON to Markdown
- **json_to_markdown.ipynb**: Converts the JSON dataset into Markdown format to enable better chunking and vectorization for use in the RAG system, preserving context.

### 3. Vector Storage
- **Vector Storing.ipynb**: Applies a MarkdownSplitter to chunk the Markdown data and stores the resulting chunks in a ChromaDB vector store for efficient retrieval.

### 4. RAG
- **RAG.ipynb**: Implements the Retrieval-Augmented Generation (RAG) pipeline. The process is as follows:
  1. A user submits a prompt requesting a hotel recommendation.
  2. Performs a similarity search to retrieve the relevant hotel name.
  3. Retrieves the corresponding hotel information chunks and latest reviews from the vector store.
  4. Uses Gemini to create a coherent Hotel Context and coherent Latest Reviews from the retrieved chunks.
  5. Constructs a prompt template , combining:
     - **User Prompt**: The user's recommendation query.
     - **Hotel Context**: Details about the hotel (e.g., amenities, description).
     - **Latest Reviews**: Filtered truthful reviews.
  6. The final prompt template for Gemini is:
     ```
     User Prompt: ...
     Hotel Context: ...
     Latest Reviews: ...
     ```
  7. Gemini generates a personalized hotel recommendation based on the provided information.

## Project Workflow
1. **Data Collection**: Scrape hotel data and reviews from TripAdvisor.
2. **Data Filtering**: Use a fine-tuned BERT model to eliminate deceptive reviews.
3. **Data Processing**: Convert the JSON dataset to Markdown for better chunking.
4. **Vector Storage**: Store the processed data in ChromaDB for efficient retrieval.
5. **Recommendation**: Use RAG with Gemini to generate hotel recommendations based on user queries.

## Future Work
- Expand the system to include hotels from other countries.
- Enhance the BERT model for better review filtering.
- Optimize the RAG pipeline for faster and more accurate recommendations.

