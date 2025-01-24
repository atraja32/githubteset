 // Handle toggling between Sign-In and Sign-Up forms
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('login-page');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// DOM Elements
const signUpBtn = document.getElementById('sign-up-btn');
const signupname = document.getElementById('sign-up-name');
const signupEmail = document.getElementById('sign-up-email');
const signuppass = document.getElementById('sign-up-pass');

const signinBtn = document.getElementById('sign-in-btn');
const signinpass = document.getElementById('sign-in-pass');
const signinEmail = document.getElementById('sign-in-email');


// Sign Up Logic
const allAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
let allAccount=[];


signUpBtn.addEventListener('click', () => {
    
  const name = signupname.value.trim();
  const email = signupEmail.value.trim();
  const pass = signuppass.value.trim();
  
  
  if (!name || !email || !pass) {
    console.log("Please fill in all the fields");
    return;
  }

  // Check if email already exists
  const emailExists = allAccounts.some(account => account.email === email);
  if (emailExists) {
    console.log("Email already registered");
    return;
  }

  // Generate unique room ID
  function generateRoomId() {
    return Math.floor(10000000 + Math.random() * 90000000); // Random 8-digit number
  }

  // Create new account
  const acc = {
    name: name,
    email: email,
    pass: pass,
    id: allAccounts.length + 1,
    roomid: generateRoomId()
  };

  // Add to accounts and store in local storage
  allAccounts.push(acc);
  allAccount=allAccounts;
  localStorage.setItem("accounts", JSON.stringify(allAccounts));

  console.log("Account created successfully:", acc);

  // Clear input fields
  signupname.value = "";
  signupEmail.value = "";
  signuppass.value = "";
});

// Sign In Logic
signinBtn.addEventListener("click", () => {
  const email = signinEmail.value.trim();
  const pass = signinpass.value.trim();
  const allAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const user = allAccounts.find(account => account.email === email);

  if (!user) {
    console.log("Email not found");
    return;
  }

  if (user.pass === pass) {
    console.log("Login successful");
    console.log("User details:", user);
    container.style.display='none';
  } else {
    console.log("Incorrect password");
  }

  // Clear input fields
  signinEmail.value = "";
  signinpass.value = "";
});