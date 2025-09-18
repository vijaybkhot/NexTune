# 🎶 NexTune — Music Metadata Management App

**A full-stack web application to manage and explore detailed music metadata including artists, albums, songs, and record companies.**

---

## Live Demo
Check out the live application here: [NexTune Live](https://nex-tune.vercel.app/)

> ⚠️ Note: On the free tier, Render may take up to ~50 seconds for the initial load as the app spins up. Subsequent requests are much faster.

---


## About This Project

NexTune is designed as a scalable, developer-friendly platform demonstrating my expertise in modern web development technologies and best practices. It showcases:

- Building robust full-stack applications using **Next.js**, **TypeScript**, and **GraphQL**
- Integrating databases (**MongoDB**, **Redis**) for efficient data storage and caching
- Implementing clean architecture with separation of concerns and reusable components
- Managing complex data relationships in a music catalog domain
- Writing production-ready code with deployment pipelines (Vercel & Render)

---

## Why This Project Matters

- Showcases proficiency in modern JavaScript and TypeScript frameworks such as React, Next.js, and Apollo Client  
- Demonstrates backend development skills including API design with GraphQL and database management using MongoDB and Redis  
- Highlights the ability to build scalable, maintainable, and production-ready full-stack applications  
- Includes real-world features like CRUD operations, dynamic UI components, and efficient data caching  
- Reflects experience with deployment workflows on cloud platforms like Vercel and Render  
- Illustrates strong problem-solving abilities through handling complex data relationships and input validation  

---

## Tech Stack Highlights

- **Frontend**: Next.js, React, TypeScript, Apollo Client  
- **Backend**: Node.js, Express, GraphQL, Mongoose  
- **Database**: MongoDB, Redis  
- **GraphQL Tooling**: Apollo GraphQL Codegen for type-safe queries and mutations  
- **Deployment**: Vercel (Frontend), Render (Backend + DB)  
- **Development Tools**: ESLint, Prettier, Git, GitHub Actions (optional)  

---

## Features Demonstrated

- Comprehensive management of music metadata with full CRUD support  
- Interactive UI with dynamic modals and responsive design  
- Efficient search and filtering functionality  
- Data seeding and caching strategies  
- Error handling and input validation  

---

## How to Run Locally

1. Clone the repository and install dependencies  
2. Set environment variables for MongoDB and Redis  
3. Seed the database with sample data  
4. Start the development server and explore the app  

Full instructions in the [Getting Started](#getting-started) section of this README.

---


## 🚀 Getting Started

### Follow these steps to run NexTune locally on your machine.

##### 1. Clone the Repository

git clone https://github.com/vijaybkhot/nextune.git
cd nextune


⸻

#### 2. Set Environment Variables

🔧 Server (/server/.env)

Create a .env file inside the server directory with the following fields:

NODE_ENV=
ALLOWED_ORIGINS=
PORT=
CLIENT_ORIGIN=
MONGO_URI=
REDIS_HOST=
REDIS_PORT=
REDIS_USER=
REDIS_PASSWORD=

🌐 Client (/client/.env.local)

Create a .env.local file inside the client directory with:

NEXT_PUBLIC_GRAPHQL_ENDPOINT=


⸻

#### 3. Install Dependencies

Server

cd server
npm install

Client

cd ../client
npm install


⸻

#### 4. Seed the Database

To drop and reseed the database with initial data (artists, albums, songs, record companies):

cd server
npm run seed


⸻

#### 5. Start the Development Servers

Start the GraphQL Server

cd server
nodemon server.js

Start the Next.js Frontend

cd ../client
npm run dev

Visit http://localhost:3000 in your browser to view the app.

---


## Let’s Connect!

If you'd like to learn more about my experience or discuss potential opportunities, please feel free to reach out!

---

## License

MIT License
