from flask import Flask, request, jsonify, send_from_directory
import os
import re

app = Flask(__name__, static_folder="static", static_url_path="")

# Simulated user database (in-memory for demo)
USERS = {
    "admin": "Admin@1234",
    "student": "Student@2025",
    "demo": "Demo@9999",
}


def validate_username(username: str) -> str | None:
    """Returns error message or None if valid."""
    if not username:
        return "Username is required."
    if len(username) < 3:
        return "Username must be at least 3 characters."
    if len(username) > 30:
        return "Username must not exceed 30 characters."
    if not re.match(r"^[a-zA-Z0-9_]+$", username):
        return "Username can only contain letters, numbers, and underscores."
    return None


def validate_password(password: str) -> str | None:
    """Returns error message or None if valid."""
    if not password:
        return "Password is required."
    if len(password) < 6:
        return "Password must be at least 6 characters."
    return None


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    username = (data.get("username") or "").strip()
    password = (data.get("password") or "")

    # Validate inputs
    u_err = validate_username(username)
    if u_err:
        return jsonify({"success": False, "field": "username", "message": u_err}), 400

    p_err = validate_password(password)
    if p_err:
        return jsonify({"success": False, "field": "password", "message": p_err}), 400

    # Check credentials
    stored = USERS.get(username.lower())
    if stored and stored == password:
        return jsonify({
            "success": True,
            "message": f"Welcome back, {username}! Login successful.",
            "user": username
        })

    return jsonify({
        "success": False,
        "field": "general",
        "message": "Invalid username or password. Please try again."
    }), 401


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
