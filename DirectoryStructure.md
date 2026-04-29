Directory Structure
The Medyo System project is divided into two main directories: frontend and backend.

Frontend
The frontend directory contains the client-side code for the Medyo System web application. It is built using React, TypeScript, and Vite.

frontend/src
: Contains the source code for the frontend application.
components: Reusable React components.
pages: Page-level components.
App.tsx: The main application component.
index.html: The main HTML file for the application.
frontend/public
: Contains static assets for the frontend application.
frontend/vite.config.ts
: Vite configuration file.
Backend
The backend directory contains the server-side code for the Medyo System API. It is built using Node.js, Express.js, and PostgreSQL.

backend/src
: Contains the source code for the backend API.
config: Configuration files for the backend API.
controllers: API controllers for handling requests.
routes: API routes for handling requests.
services: Business logic services for the API.
backend/dist
: Contains the compiled JavaScript code for the backend API.
backend/package.json
: npm package file for the backend API.
Root Directory
The root directory contains the top-level files for the Medyo System project.

README.md: This file.
package.json: npm package file for the entire project.
Environment Variables
The Medyo System project uses environment variables to store sensitive information such as database credentials and API keys. These variables are stored in a .env file in the root directory.

PORT: The port number for the backend API.
DB_USER: The database username.
DB_HOST: The database host.
DB_DATABASE: The database name.
DB_PASSWORD: The database password.
DB_PORT: The database port number.
SESSION_SECRET: The secret key for session management.
