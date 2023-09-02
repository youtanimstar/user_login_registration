import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVvUu3a-wlJvutqpWuAl7zeawbdF4to0Y",
  authDomain: "login-register-html.firebaseapp.com",
  projectId: "login-register-html",
  storageBucket: "login-register-html.appspot.com",
  messagingSenderId: "704837206860",
  appId: "1:704837206860:web:1525acb984e1f486c705e9",
  measurementId: "G-WSTCCJF68Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const form = document.querySelector("#contactForm");
const register = document.querySelector("#register");
const profile = document.querySelector("#profile");
register.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const message = document.querySelector(".message");
  message.innerHTML = "Register Successfully";
  const profileUpdates = {
    displayName: name,
  };
  // create user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //   user.displayName = name;
      // console.log(user);
      // const userNow = auth.currentUser;
      updateProfile(user,profileUpdates)
        .then(() => {
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          console.log("Error updating profile:", error);
        });
      console.log(user);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      message.innerHTML = `${errorMessage}`;
    });
  form.reset();
});

const login = document.querySelector("#login");
login.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const message = document.querySelector(".message");

  // create user
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      message.innerHTML = `Welcome Back ${user.displayName}`;
      document.getElementById('logout').style.display = 'block';
      profile.setAttribute("src", `https://avatars.githubusercontent.com/${user.displayName}`);
      profile.style.display = 'block';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      message.innerHTML = `${errorMessage}`;
    });

  form.reset();
});

const logout = document.querySelector("#logout");
logout.addEventListener("click", ()=>{
  const message = document.querySelector(".message");
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sign-out successful.');
    message.innerHTML = "Sign-out successful.";
    document.getElementById('logout').style.display = 'none';
    profile.style.display = 'none';
  }).catch((error) => {
    // An error happened.
    message.innerHTML = error;
  });		 
})
