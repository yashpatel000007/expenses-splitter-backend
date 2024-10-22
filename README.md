# Daily Expenses Sharing Application Backend

The Daily Expenses Sharing Application is a backend service designed to help users share and manage daily expenses. It supports splitting expenses in three different ways: equally, by exact amounts, or by percentages. The backend is built using Node.js, Express, and Sequelize, with PostgreSQL as the database.

## Features

- **User Management**: Register and authenticate users.
- **Expense Management**: Create and manage expenses with multiple participants.
- **Expense Splitting**: Split expenses equally, by exact amounts, or by percentages.
- **Downloadable Balance Sheet**: Generate and download a CSV balance sheet for expenses.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14 or higher)
- PostgreSQL (or any other SQL-compatible database)
- Git (for version control)

## Setup Instructions

### 1. Clone the Repository

Clone the project from the GitHub repository and navigate to the project directory:
```bash
git clone https://github.com/yashpatel000007/expenses-splitter-backend.git
cd expenses-splitter-backend
```
### 2. Install Dependencies
Install the required project dependencies using npm:
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root directory and configure the following variables:
```bash
DATABASE_URL=postgres://username:password@localhost:5432/expenses_db
JWT_SECRET=your_jwt_secret
PORT=3000
```
- Replace username, password, and expenses_db with your PostgreSQL database credentials.
- Set JWT_SECRET to a random string for signing JSON Web Tokens.

### 4. Run the Application
Start the application using:
```bash
npm start
```
The application will start running on http://localhost:3000 by default.

### Project Structure
The project follows a modular structure for better maintainability:
```bash
expenses-splitter-backend/
├── src/
│   ├── config/                # Database configuration
│   ├── controllers/           # API controllers
│   ├── models/                # Sequelize models
│   ├── routes/                # API route definitions
│   ├── services/              # Business logic
│   ├── middlewares/           # Middleware (e.g., authentication)
│   ├── utils/                 # Utility functions
│   ├── app.js                 # Express app setup
│   └── server.js              # Server startup
├── node_modules/              # Project dependencies
├── .env                       # Environment variables file
├── .gitignore                 # Git ignore rules
├── package.json               # Project metadata and scripts
├── package-lock.json          # Dependency lock file
└── README.md                  # Project documentation
```
### Expense Splitting
- Equal Split: Automatically divides the total expense equally among all participants.
- Exact Split: Allows specifying exact amounts for each participant.
- Percentage Split: Distributes the expense based on specified percentages.
  
### Deployment
For deployment, set up environment variables for your production environment and start the application with a process manager like PM2.

### Contact
For any inquiries or support, please reach out to Yash Patel.
