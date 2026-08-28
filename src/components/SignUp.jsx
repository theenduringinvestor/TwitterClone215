import { useState } from "react";
function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Sign Up</h1>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="button">Sign Up</button>
    </div>
  );
}
export default SignUp;
