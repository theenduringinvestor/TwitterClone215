import { useState } from "react";
import "../styles/Signin.css";

function Signin({ onSignedIn, onSignUp }) {
  function handleSignIn() {
    if (!email && !password) {
      console.log("Please enter your email and password.");
    } else if (!email) {
      console.log("Please enter your email.");
    } else if (!password) {
      console.log("Please enter your password.");
    } else {
      console.log("Sign In successful.");
    }
    onSignedIn();
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="signin-page">
      <div className="signin">
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={onSignUp}>
            Sign up
          </button>
        </p>
        <button type="button">Forgot password?</button>
      </div>
    </div>
  );
}

export default Signin;
