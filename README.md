# Product Management Application – Frontend

This repository contains the **frontend** of the Product Management Application, built with Angular.  
The application works together with the **backend API** (ASP.NET Core) and a **PostgreSQL** database, all managed via Docker Compose.

---

## 📦 Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started) (latest version recommended)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 📂 Project Structure

For Docker Compose to work, you need to have **both frontend and backend repositories cloned into the same folder**.

## 🛠 Clone Repositories

# Clone the frontend (this repo)

`git clone https://github.com/<Omar-Sa03>/Product-Management-Frontend.git`

# Clone the backend

`git clone https://github.com/<Omar-Sa03>/Product-Management-Backend.git`

# Docker Compose File

Save the following content as docker-compose.yml in the parent folder containing both repos:

version: '3.8'
 
services:
  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: Perfume_DB
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
 
  api:
    build:
      context: ./Product-Management-Backend
      dockerfile: Dockerfile
    ports:
      - "44395:8080"
    depends_on:
      - db
    environment:
      - PG_HOST=db
      - PG_DATABASE=Perfume_DB
      - PG_USERNAME=postgres
      - PG_PASSWORD=postgres
 
  app:
    build:
      context: ./Product-Management-Frontend
      dockerfile: dockerfile
    ports:
      - "4200:4200"
    depends_on:
      - api

volumes:
  db-data:

# 🚀 How to Run the Application

## 1️⃣ Navigate to the parent folder containing both frontend and backend repos.

`cd path/to/project-folder`

## ️⃣ Build and start the containers:

`docker compose up --build`


## 3️⃣ Access the app:

Frontend (Angular) → http://localhost:4200

Backend API (ASP.NET Core) → http://localhost:44395

Database (PostgreSQL) → Port 5432 (default credentials in docker-compose.yml)

🛑 Stopping the Application

To stop all running containers:

docker compose down