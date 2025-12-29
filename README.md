🚗 Vehicle Rental System

Live URL:
👉 Coming Soon (Deploy on Vercel / Render / Railway and update this link)

📌 Project Overview

The Vehicle Rental System is a backend-driven application designed to manage vehicle rentals efficiently.
It supports user role-based access, vehicle management, and secure update operations.
This project focuses on clean API design, authorization logic, and PostgreSQL-based data handling.

✨ Features
🔐 Authentication & Authorization

Role-based access control (admin, customer)

Customers can update only their own data

Admins have full control over users and vehicles

Unauthorized role changes are blocked

👤 User Management

Update user profile (name, email, phone)

Admin-only role updates

Proper handling of non-existing users

🚘 Vehicle Management

Add, update, and manage vehicles

Update vehicle details:

Vehicle name

Type

Registration number

Daily rent price

Availability status

Uses parameterized queries to prevent SQL injection

🗄 Database

PostgreSQL with structured relational schema

Safe queries using prepared statements

Proper error and edge-case handling

🛠 Technology Stack
Backend

Node.js

Express.js

TypeScript

Database

PostgreSQL

pg (node-postgres)

Tools & Practices

RESTful API architecture

Role-based authorization

Clean service-layer logic

Environment-based configuration

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/TazwoarCommits/Level-2B6-A2.git
cd vehicle-rental-system

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/your_database

4️⃣ Database Setup

Create a PostgreSQL database

Run required table creation scripts (users, vehicles, bookings, etc.)

5️⃣ Run the Server
npm run dev


Server will start at:

http://localhost:5000

▶️ Usage

Use Postman / Thunder Client to test API endpoints

Authenticate users before accessing protected routes

Admins can manage vehicles and users

Customers can update their own profile only