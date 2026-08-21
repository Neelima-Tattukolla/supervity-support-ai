# Supervity Support AI

## Customer Support AI Employee

A lightweight AI-powered customer support assistant for Tier-1 ticket triage.

The application classifies incoming support questions into Billing, Technical,
Account Access, or Out of Scope categories. It retrieves relevant answers from
a small FAQ knowledge base and escalates low-confidence queries to a human.

## Features

- Ticket classification
- Billing, Technical, and Account Access categories
- FAQ-based retrieval
- Source-grounded responses
- Confidence scoring
- Low-confidence detection
- Human escalation
- Conversation history
- Simple web-based chat interface

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Data
- JSON-based FAQ knowledge base

## Architecture

User  
↓  
React Frontend  
↓  
Node.js / Express Backend  
↓  
Ticket Classification  
↓  
FAQ Retrieval  
↓  
Grounded Response  
↓  
Confidence Check  
↓  
Human Escalation if confidence < 70%

## Project Structure

```text
supervity-support-ai/
├── backend/
│   ├── knowledge-base/
│   │   ├── faq.json
│   │   └── retrieve.js
│   └── server.js
├── frontend/
│   └── src/
│       └── App.jsx
└── README.md