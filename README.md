# 🔐 Password Manager

A simple password manager with folder support, built using Django REST Framework and React. This project allows users to store credentials (username, password, and URL) inside custom folders. It supports authentication and clean UI interactions for creating, viewing, and deleting entries.

---

## 🧠 Features

- 🔐 User authentication with JWT
- 📁 Create and delete folders
- ✏️ Add, view, and delete password entries
- ➕ On-the-fly folder creation during entry creation
- 🎨 Clean and responsive React-based interface

---

## 🛠️ Tech Stack

### Backend:
- Python 3.x
- Django
- Django REST Framework
- JWT via `djangorestframework-simplejwt`

### Frontend:
- React (Vite)
- Axios for API calls
- CSS for basic styling

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend/
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup

```bash
cd frontend/
npm install
npm run dev
```

Create a `.env` file in the `frontend/` directory:

```
VITE_API_URL=http://localhost:8000
```

---

## 🌐 API Overview

### 📁 Folders

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| GET    | `/api/folders/`      | List user folders       |
| POST   | `/api/folders/`      | Create folder           |
| DELETE | `/api/folders/:id/delete/` | Delete folder      |

#### Example Request:
```json
POST /api/folders/
{
  "name": "Work"
}
```
---

### 🗂️ Entries

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | `/api/entries/`      | List user entries         |
| POST   | `/api/entries/`      | Create password entry     |
| DELETE | `/api/entries/:id/delete/` | Delete password entry |

#### Example Request:
```json
POST /api/entries/
{
  "username": "john_doe",
  "password": "supersecure",
  "url": "https://example.com",
  "folder": 1
}
```
---

## 🧪 Sample Flow

1. Log in or register a user (JWT token saved to localStorage)
2. Create folders via the UI
3. Add password entries to specific folders
4. Optionally create a new folder while adding an entry
5. Delete folders or entries when no longer needed

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

> Built as a demo project for learning Django + React integration. Contributions welcome!
