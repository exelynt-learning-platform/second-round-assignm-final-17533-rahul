# second-round-assignm-final-17533-rahul
Final Project Assignment - This repository contains the complete final project code and documentation.
# Chatbox App (React + Redux Toolkit + OpenAI)

## Setup
1. npm install
2. Add .env file
3. npm start

## Features
- Chat with AI
- Redux state management
- Loading & error handling

## 🔐 API Security

This project uses a backend server (`server.js`) to securely interact with the OpenAI API.

* The API key is stored in environment variables on the server.
* The frontend never directly calls the OpenAI API.
* All requests are routed through a backend endpoint (`/api/chat`).

### Why?

Calling OpenAI API directly from the frontend exposes the API key in the browser, which is a security risk. Using a backend proxy ensures the key remains secure.

### Flow:

Frontend → Backend → OpenAI API
