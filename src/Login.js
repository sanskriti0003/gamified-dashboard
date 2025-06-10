// src/Login.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Login() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // On success, reload or redirect
      window.location.reload();
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login to Gamified Dashboard</h2>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;