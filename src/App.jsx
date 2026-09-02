import Header from "./components/Header";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { useState } from "react";

function App() {
  const [view, setView] = useState("signin");

  return (
    <main className="app">
      <Header />
      {view === "dashboard" ? (
        <Dashboard />
      ) : view === "signup" ? (
        <SignUp onSignIn={() => setView("signin")} />
      ) : (
        <Signin
          onSignedIn={() => setView("dashboard")}
          onSignUp={() => setView("signup")}
        />
      )}
    </main>
  );
}

export default App;
