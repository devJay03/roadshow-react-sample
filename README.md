# Medyo System

## Overview

Medyo System is a comprehensive point-of-sale (POS) and inventory management solution designed to streamline restaurant operations. This project aims to provide a robust system for handling daily sales, tracking inventory, forecasting future sales, and improving internal communication through a dynamic whiteboard feature. Additionally, it incorporates an AI-powered recommendation engine to optimize ingredient usage and minimize waste.

## Features

Medyo System is built with the following core functionalities:

- **Point of Sale (POS):** A user-friendly interface for processing orders, managing tables, and handling various payment methods.
- **Inventory Management:** Real-time tracking of ingredients and supplies, including stock levels, low-stock alerts, and supplier management.
- **Sales Reporting:** Detailed reports and analytics on sales performance, helping identify trends and popular items.
- **Whiteboard:** A dynamic visual tool to display real-time order statuses for employees, showing which tables have or haven't received an order. This aims to improve efficiency and reduce missed orders.
- **Sales Forecasting:** Utilizes historical sales data to predict future sales trends, assisting in inventory planning and staff scheduling.
- **AI-Powered Recommendations:** An intelligent system that analyzes current inventory to recommend types of drinks or dishes that can be made using ingredients that are nearing expiration or have not been utilized recently, helping to reduce waste.
- **Customizable Admin Dashboard:** Provides administrators with a personalized dashboard featuring draggable, resizable, and content-customizable widgets to display key data analytics and operational insights tailored to their needs.
- **Role-Based Access Control (RBAC):** Ensures secure access to system functionalities by assigning different permissions based on user roles (e.g., Administrator, Manager, Cashier, Inventory Staff).
- **User Management:** Comprehensive tools for creating, editing, deactivating, and managing user accounts and their associated roles within the system.
- **Audit Logs:** Maintains a detailed log of significant system activities and user actions, enhancing security, accountability, and traceability for operational changes.

## Technology Stack

Medyo System leverages a modern and powerful technology stack for both its frontend and backend development, ensuring a responsive, scalable, and maintainable application.

### Frontend

- **React:** A declarative, component-based JavaScript library for building interactive user interfaces.
- **Vite:** A fast build tool that provides a lightning-fast development experience for React applications.
- **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality, readability, and maintainability, especially for a complex application.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs without writing traditional CSS.

### Backend

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building fast and scalable network applications.
- **Express.js:** A minimalist web framework for Node.js, providing robust features for web and mobile applications.

### Database

- **PostgreSQL:** (Or **MongoDB**, if chosen) A powerful, open-source relational database system known for its strong reliability, feature robustness, and performance. (You'll update this once you've made your final decision).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm or Yarn (package manager)
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/medyo-system.git](https://github.com/your-username/medyo-system.git)
    cd medyo-system
    ```
2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend # Assuming your frontend code is in a 'frontend' directory
    npm install # or yarn install
    ```
3.  **Install Backend Dependencies:**
    ```bash
    cd ../backend # Assuming your backend code is in a 'backend' directory
    npm install # or yarn install
    ```
4.  **Database Setup:**
    - **PostgreSQL:** Set up a PostgreSQL instance and create a database for Medyo System. You will need to configure your backend to connect to this database (e.g., via environment variables).
    - **MongoDB:** (If chosen) Set up a MongoDB instance (local or Atlas) and configure your backend.
    - _Further instructions for database seeding or migrations will go here once implemented._

### Running the Application

1.  **Start the Backend & Frontend Server:**
    cd to Root Folder which is medyoSytem
    type on terminal npm run dev

The application should now be running in your browser, usually at `http://localhost:5173` for the frontend and your backend will be running on a specified port (e.g., `http://localhost:3000`).
