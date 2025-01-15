import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase Configuration
const appSettings = {
  databaseURL: "https://tech-ticketing-app-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);

// Reference to database path
const userInfoRef = ref(database, "userInfo");
const ticketsRef = ref(database, "tickets");

console.log("Firebase App Initialized:", app);

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



// Handle account creation
createAccountButton.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    // Save user information to the database
    push(userInfoRef, {
      email: email,
      password: password, // Store hashed passwords in production, not plain text
      createdAt: new Date().toISOString(),
    })
      .then(() => {
        alert("Account created successfully!");
        showTicketScreen();
      })
      .catch((error) => {
        console.error("Error creating account:", error.message);
        alert("Error creating account: " + error.message);
      });
  } else {
    alert("Please enter a valid email and password.");
  }
});

// Handle ticket submission
ticketForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form reload

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
    // Save ticket data to the database
    push(ticketsRef, ticketData)
      .then(() => {
        alert("Ticket submitted successfully!");
        
        ticketForm.reset(); // Clear the form
      })
      .catch((error) => {
        console.error("Error submitting ticket:", error.message);
        alert("Error submitting ticket: " + error.message);
      });
  } else {
    alert("Please fill out all required fields (Description and Room Number).");
  }
});

// Screen toggle functions
function showTicketScreen() {
  loginScreen.style.display = "none";
  ticketScreen.style.display = "block";
}

function showLoginScreen() {
  loginScreen.style.display = "block";
  ticketScreen.style.display = "none";
}


