import Header from "./components/Header";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import "./App.css";
import "./firebase";
import { useState } from "react";

function App() {
  const [view, setView] = useState("signin");

  return (
    <main className="app">
      {view === "dashboard" ? (
        <Dashboard />
      ) : view === "signup" ? (
        <>
          <Header />
          <SignUp onSignIn={() => setView("signin")} />
        </>
      ) : (
        <>
          <Header />
          <Signin
            onSignedIn={() => setView("dashboard")}
            onSignUp={() => setView("signup")}
          />
        </>
      )}
    </main>
  );
}

export default App;
