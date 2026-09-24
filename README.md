# API Development Platform

A robust, full-stack API development and testing platform (similar to Postman), built with React and Node.js. This application allows developers to build, send, and analyze HTTP requests.

## Features Built
- **API Request Builder**: Construct HTTP requests (GET, POST, PUT, DELETE, PATCH).
- **Request Execution Proxy**: A Node.js backend that executes requests, bypassing browser CORS restrictions.
- **Response Analysis**: View response status, size, latency (ms), and formatted JSON response bodies.
- **Premium UI**: A sleek, dark-mode focused modern UI.

## Tech Stack
- **Frontend**: React, Vite, Vanilla CSS
- **Backend**: Node.js, Express, Axios
- **Architecture**: Separated client/server structure

## Project Structure
```text
api-platform/
├── client/          # React frontend (Vite)
│   ├── src/         # UI components and styling
│   └── package.json # Frontend dependencies
├── server/          # Node.js backend (Express)
│   ├── index.js     # API proxy server
│   └── package.json # Backend dependencies
└── README.md
```

## Setup & Running Locally

### 1. Start the Backend Server
Open a terminal, navigate to the `server` directory, and run:
```bash
cd server
npm install
node index.js
```
The backend will run on `http://localhost:5000`.

### 2. Start the Frontend Client
Open a second terminal, navigate to the `client` directory, and run:
```bash
cd client
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

## HackerRank Evaluation Requirements
This repository structure is ready for the HackerRank evaluation tests. To submit:
1. Push to a private GitHub repository.
2. Include all necessary skills/transcripts as per the instructions.
3. Transfer ownership upon acceptance.
