# CSC426 — Web Login Authentication App

A full-stack login authentication application built with **Python (Flask)** backend and a responsive **HTML/CSS/JavaScript** frontend.

---

## Features

- Username & password login form
- Client-side input validation (real-time + on submit)
- Server-side validation in Python
- Success and error messages with clear visual feedback
- Password visibility toggle
- Reset/Cancel button clears all fields
- Responsive design (mobile + desktop)
- Shake animation on invalid login attempt
- Enter key submits form

## Demo Credentials

| Username | Password     |
|----------|-------------|
| admin    | Admin@1234  |
| student  | Student@2025|
| demo     | Demo@9999   |

---

## Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Backend  | Python 3.11, Flask   |
| Frontend | HTML5, CSS3, Vanilla JS |
| Server   | Gunicorn (WSGI)      |
| Deploy   | Render.com           |

---

## Project Structure

```
CSC426/
├── app.py              # Flask backend + API routes
├── requirements.txt    # Python dependencies
├── render.yaml         # Render deployment config
├── .gitignore
├── README.md
└── static/
    ├── index.html      # Login page (HTML)
    ├── style.css       # Styles
    └── script.js       # Client-side logic
```

---

## Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/CSC426.git
cd CSC426

# 2. Create virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py
# Visit: http://localhost:5000
```

---

## Deploy on Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` → click **Deploy**
5. Your live URL: `https://csc426-login-app.onrender.com`

---

## API Endpoint

**POST** `/api/login`

Request body:
```json
{ "username": "admin", "password": "Admin@1234" }
```

Success response:
```json
{ "success": true, "message": "Welcome back, admin!", "user": "admin" }
```

Error response:
```json
{ "success": false, "field": "general", "message": "Invalid username or password." }
```

---

*CSC426 — Web Application Development Project*
