# React Task Management Frontend

A responsive React + TypeScript frontend for the Task Management system with Tailwind CSS for styling.

## Features

- ✅ React with TypeScript  
- ✅ Tailwind CSS for styling  
- ✅ User login and registration  
- ✅ Task CRUD (Create, Read, Update, Delete) operations  with Search and Filter by Status
- ✅ JWT-based authentication flow  
- ✅ API integration with backend  

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest)
- Backend API running (refer to [Backend README](../backend/README.md))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

> Make sure this URL matches your backend server.

### 4. Start the development server

```bash
npm run dev
```

The app will run on `http://localhost:5173` by default.

## Project Structure

```bash
src/
├── components/        # Reusable UI components
├── pages/             # Pages like Login, Register, Task
├── services/          # API request logic
├── App.tsx            # Main app entry
└── main.tsx           # React root rendering
```
