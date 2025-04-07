import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

function loginAdmin() {
  const email = document.getElementById("adminEmail").value;
  const pass = document.getElementById("adminPass").value;
  const loginStatus = document.getElementById("loginStatus");

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      document.getElementById("loginSection").style.display = "none";
      document.getElementById("adminSection").style.display = "block";
      loginStatus.innerText = "Login successful!";
      loginStatus.style.color = "green";
    })
    .catch(e => {
      loginStatus.innerText = "Login failed: " + e.message;
      loginStatus.style.color = "red";
    });
}

// Ensure the login button in HTML is linked to this function
// <button onclick="loginAdmin()">Login</button>
