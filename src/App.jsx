import Header from "./components/Header";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { useState } from "react";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <main className="app">
      <Header />
      {isSignedIn ? (
        <Dashboard />
      ) : (
        <Signin onSignedIn={() => setIsSignedIn(true)} />
      )}
    </main>
  );
}

export default App;
