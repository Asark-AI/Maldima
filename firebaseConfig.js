<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCp_ZmwFwfP8S472HemWs62h0Icby2Rg_c",
    authDomain: "smart-a-f0600.firebaseapp.com",
    databaseURL: "https://smart-a-f0600-default-rtdb.firebaseio.com",
    projectId: "smart-a-f0600",
    storageBucket: "smart-a-f0600.appspot.com",
    messagingSenderId: "118607471313",
    appId: "1:118607471313:web:2905268624b9b418ba1bf0",
    measurementId: "G-XXXXXXXXXX" // Optional, if available
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
  const rtdb = getDatabase(app);

  export { auth, db, rtdb };

  // Example usage for Google Login
  const googleLogin = document.getElementById("google-Login-btn");
  googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  });
</script>