import Header from "./components/Header";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [view, setView] = useState("signin");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  return (
    <main className="app">
      {user ? (
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
