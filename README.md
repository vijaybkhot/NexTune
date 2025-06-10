

# 🎵 NexTune

**NexTune** is a full-featured music aggregation platform built with **React** and **Apollo Client**, powered by a custom **GraphQL** backend. It allows users to explore, manage, and search artists, albums, songs, and record companies with rich interlinked interfaces and modal-based CRUD operations.


---

## 🚀 Features

- 🎤 View, add, edit, and delete **Artists**
- 💿 Manage **Albums** with genre and song lists
- 🏢 Explore and update **Record Companies**
- 🎶 Full **Song** CRUD with linking to albums and artists
- 🔍 **Search Functionality** for:
  - Albums by Genre
  - Artists by Name
  - Companies by Founded Year
  - Songs by Title
- 🔗 **Interlinked Pages** between all entities
- 🧩 Modal-based Add/Edit forms
- ⚡ **Apollo Client** for seamless GraphQL interactions

---

## 🛠️ Tech Stack

- **React**
- **Apollo Client**
- **GraphQL**
- **Node.js + Express**
- **Redis**
- **Tailwind CSS**

---

## 📂 Folder Structure

NexTune/
├── react-client/         # React frontend with Apollo Client
├── server/               # GraphQL backend 

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/vijaybkhot/NexTune.git
cd NexTune
```


⸻

2. Set Up the Server

cd server
npm install
npm start

Ensure your GraphQL backend is running at the expected URI (e.g., http://localhost:4000/graphql).

⸻

3. Set Up the Client

Open a new terminal tab/window:

cd react-client
npm install
npm start

The React app will be available at http://localhost:3000

Update Apollo Client URI if needed in react-client/src/index.js or your Apollo setup file.

⸻

🔍 Route Overview
	•	/ – App introduction
	•	/artists – Artist listing, add/edit/delete, detail links
	•	/artists/:id – Artist profile + albums + songs
	•	/albums – Album listing, add/edit/delete
	•	/albums/:id – Album profile + songs + artist/company links
	•	/companies – Company listing with CRUD actions
	•	/companies/:id – Company profile + albums
	•	/songs/:id – Song profile + edit/delete
	•	/search – Unified search across albums, artists, companies, and songs


⸻

👨‍💻 Author

Vijay Khot
	•	GitHub: @vijaybkhot
	•	LinkedIn: Vijay Sinh Khot

⸻

📄 License

This project was created for CS-554 Lab 6 at Stevens Institute of Technology.

⸻
