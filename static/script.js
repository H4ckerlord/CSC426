// ===== DOM REFS =====
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const btnLogin      = document.getElementById("btnLogin");
const btnReset      = document.getElementById("btnReset");
const btnLoader     = document.getElementById("btnLoader");
const btnLogout     = document.getElementById("btnLogout");
const togglePw      = document.getElementById("togglePw");
const eyeOpen       = document.getElementById("eyeOpen");
const eyeClosed     = document.getElementById("eyeClosed");
const alert_        = document.getElementById("alert");
const alertIcon     = document.getElementById("alertIcon");
const alertMsg      = document.getElementById("alertMsg");
const fieldUsername = document.getElementById("fieldUsername");
const fieldPassword = document.getElementById("fieldPassword");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginForm     = document.getElementById("loginForm");
const successState  = document.getElementById("successState");
const successName   = document.getElementById("successName");

// ===== VALIDATION HELPERS =====
function validateUsername(val) {
  if (!val.trim()) return "Username is required.";
  if (val.trim().length < 3) return "Username must be at least 3 characters.";
  if (val.trim().length > 30) return "Username must not exceed 30 characters.";
  if (!/^[a-zA-Z0-9_]+$/.test(val.trim())) return "Only letters, numbers, and underscores allowed.";
  return null;
}

function validatePassword(val) {
  if (!val) return "Password is required.";
  if (val.length < 6) return "Password must be at least 6 characters.";
  return null;
}

function setFieldState(field, errorEl, errMsg) {
  field.classList.remove("error", "valid");
  if (errMsg) {
    field.classList.add("error");
    errorEl.textContent = errMsg;
  } else {
    field.classList.add("valid");
    errorEl.textContent = "";
  }
}

function clearFieldState(field, errorEl) {
  field.classList.remove("error", "valid");
  errorEl.textContent = "";
}

// ===== ALERT =====
function showAlert(type, icon, msg) {
  alert_.className = `alert ${type} show`;
  alertIcon.textContent = icon;
  alertMsg.textContent = msg;
}

function hideAlert() {
  alert_.className = "alert";
}

// ===== TOGGLE PASSWORD =====
togglePw.addEventListener("click", () => {
  const isPw = passwordInput.type === "password";
  passwordInput.type = isPw ? "text" : "password";
  eyeOpen.style.display   = isPw ? "none" : "block";
  eyeClosed.style.display = isPw ? "block" : "none";
  passwordInput.focus();
});

// ===== REAL-TIME VALIDATION =====
usernameInput.addEventListener("blur", () => {
  const err = validateUsername(usernameInput.value);
  if (usernameInput.value) setFieldState(fieldUsername, usernameError, err);
});

usernameInput.addEventListener("input", () => {
  if (fieldUsername.classList.contains("error")) {
    const err = validateUsername(usernameInput.value);
    setFieldState(fieldUsername, usernameError, err);
  }
  hideAlert();
});

passwordInput.addEventListener("blur", () => {
  const err = validatePassword(passwordInput.value);
  if (passwordInput.value) setFieldState(fieldPassword, passwordError, err);
});

passwordInput.addEventListener("input", () => {
  if (fieldPassword.classList.contains("error")) {
    const err = validatePassword(passwordInput.value);
    setFieldState(fieldPassword, passwordError, err);
  }
  hideAlert();
});

// ===== LOGIN =====
async function handleLogin() {
  hideAlert();
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Client-side validation first
  const uErr = validateUsername(username);
  const pErr = validatePassword(password);

  setFieldState(fieldUsername, usernameError, uErr);
  setFieldState(fieldPassword, passwordError, pErr);

  if (uErr || pErr) {
    showAlert("error", "⚠", "Please fix the errors above.");
    return;
  }

  // Loading state
  btnLogin.disabled = true;
  btnLoader.classList.add("show");
  document.getElementById("btnLogin").querySelector(".btn-text").textContent = "Signing in...";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password })
    });

    const data = await res.json();

    if (data.success) {
      // Show success
      loginForm.style.display = "none";
      successName.textContent = `Welcome, ${data.user}!`;
      successState.classList.add("show");
      showAlert("success", "✓", data.message);
    } else {
      // Show error
      if (data.field === "username") {
        setFieldState(fieldUsername, usernameError, data.message);
      } else if (data.field === "password") {
        setFieldState(fieldPassword, passwordError, data.message);
      } else {
        // General error — shake both fields
        setFieldState(fieldUsername, usernameError, null);
        setFieldState(fieldPassword, passwordError, null);
        fieldUsername.classList.remove("valid");
        fieldPassword.classList.remove("valid");
      }
      showAlert("error", "✕", data.message);

      // Shake animation on card
      const card = document.querySelector(".form-card");
      card.style.animation = "none";
      card.offsetHeight; // reflow
      card.style.animation = "shake 0.4s ease";
    }
  } catch (err) {
    showAlert("error", "⚠", "Network error. Please check your connection and try again.");
  } finally {
    btnLogin.disabled = false;
    btnLoader.classList.remove("show");
    document.getElementById("btnLogin").querySelector(".btn-text").textContent = "Login";
  }
}

// ===== RESET =====
function handleReset() {
  usernameInput.value = "";
  passwordInput.value = "";
  clearFieldState(fieldUsername, usernameError);
  clearFieldState(fieldPassword, passwordError);
  hideAlert();
  usernameInput.focus();
}

// ===== LOGOUT =====
function handleLogout() {
  loginForm.style.display = "";
  successState.classList.remove("show");
  handleReset();
}

// ===== EVENT LISTENERS =====
btnLogin.addEventListener("click", handleLogin);
btnReset.addEventListener("click", handleReset);
btnLogout.addEventListener("click", handleLogout);

// Enter key support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !successState.classList.contains("show")) {
    handleLogin();
  }
});

// Shake keyframe injection
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-6px)}
    80%{transform:translateX(6px)}
  }
`;
document.head.appendChild(style);
