// Import necessary Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const firebaseConfig = {

};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

/* === Event Listeners === */

// Sign in
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

// Create account
createAccountButton.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
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

// Ticket submission
ticketForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload

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
    addDoc(collection(db, "tickets"), ticketData)
      .then(() => {
        alert("Ticket submitted successfully!");
        ticketForm.reset();
      })
      .catch((error) => {
        alert("Error submitting ticket: " + error.message);
      });
  } else {
    alert("Please fill out all required fields (Description and Room Number).");
  }
});



// Show ticket screen
function showTicketScreen() {
  loginScreen.style.display = "none";
  ticketScreen.style.display = "block";
}

// Show login screen (optional, if logging out is added)
function showLoginScreen() {
  loginScreen.style.display = "block";
  ticketScreen.style.display = "none";
}
