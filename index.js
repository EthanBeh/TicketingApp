import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkWvmeW_fRGI7seJzZY8X0slN3oRhYibk",
  authDomain: "tech-ticketing-app.firebaseapp.com",
  projectId: "tech-ticketing-app",
  storageBucket: "tech-ticketing-app.firebasestorage.app",
  messagingSenderId: "607861308775",
  appId: "1:607861308775:web:9f687d695d776da01bc3c2",
  databaseURL: "https://tech-ticketing-app-default-rtdb.firebaseio.com/",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// DOM elements
const loginScreen = document.getElementById("login-screen");
const ticketScreen = document.getElementById("ticket-screen");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInButton = document.getElementById("sign-in");
const createAccountButton = document.getElementById("create-account");

const ticketForm = document.querySelector("#ticket-screen form");
const problemSelect = document.getElementById("problem");
const affectedSelect = document.getElementById("affected");
const descriptionInput = document.getElementById("description");
const triedInput = document.getElementById("tried");
const adminSelect = document.getElementById("admin");
const roomInput = document.getElementById("room");
const stationsInput = document.getElementById("stations");

// Show only the login screen on page load
document.addEventListener("DOMContentLoaded", () => {
  showLoginScreen();
});

// Authentication Event Listeners
signInButton.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signed in successfully");
        showTicketScreen();
      })
      .catch((error) => {
        alert("Error signing in: " + error.message);
      });
  } else {
    alert("Please enter your email and password.");
  }
});

createAccountButton.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, `users/${user.uid}`), {
          email: user.email,
          createdAt: new Date().toISOString(),
        });
        alert("Account created successfully");
        showTicketScreen();
      })
      .catch((error) => {
        alert("Error creating account: " + error.message);
      });
  } else {
    alert("Please enter your email and password.");
  }
});

// Ticket Submission Event Listener
ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const ticketData = {
    problem: problemSelect.value,
    affected: affectedSelect.value,
    description: descriptionInput.value.trim(),
    tried: triedInput.value.trim(),
    adminRequired: adminSelect.value,
    roomNumber: roomInput.value.trim(),
    stationsAffected: stationsInput.value.trim(),
    timestamp: new Date().toISOString(),
  };

  if (ticketData.description && ticketData.roomNumber) {
    push(ref(db, "tickets"), ticketData)
      .then(() => {
        alert("Ticket submitted successfully!");
        ticketForm.reset(); // Reset the form
      })
      .catch((error) => {
        alert("Error submitting ticket: " + error.message);
      });
  } else {
    alert("Please fill out all required fields (Description and Room Number).");
  }
});

// Screen Toggle Functions
function showTicketScreen() {
  loginScreen.style.display = "none";
  ticketScreen.style.display = "block";
}

function showLoginScreen() {
  loginScreen.style.display = "block";
  ticketScreen.style.display = "none";
}

