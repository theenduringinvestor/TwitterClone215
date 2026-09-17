import { useState } from "react";
import "../styles/Signup.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp({ onSignIn }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup">
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <button className="signin-link" type="button" onClick={onSignIn}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
