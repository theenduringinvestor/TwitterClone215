import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import xLogo from "../assets/X-Logo.png";
import { auth } from "../firebase";

const navItems = [
  ["⌂", "Home", true],
  ["♧", "Notifications"],
  ["✉", "Messages"],
  ["▣", "Lists"],
  ["♙", "Profile"],
  ["•••", "Buy Issue"],
];

function Sidebar({ activePage, onHome, onLogout, onProfile }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const accountName = user?.displayName || user?.email;
  const avatarInitial = accountName?.trim().charAt(0).toUpperCase();

  return (
    <aside className="dashboard__sidebar">
      <img className="dashboard__logo" src={xLogo} alt="X" />
      <nav className="dashboard__nav" aria-label="Primary navigation">
        {navItems.map(([icon, label, active]) => (
          <button
            className={
              (label === "Home" && activePage === "home") ||
              (label === "Profile" && activePage === "profile") ||
              (active && !["Home", "Profile"].includes(label))
                ? "is-active"
                : ""
            }
            key={label}
            type="button"
            onClick={
              label === "Home"
                ? onHome
                : label === "Profile"
                  ? onProfile
                  : undefined
            }
          >
            <span aria-hidden="true">{icon}</span>
            <strong>{label}</strong>
          </button>
        ))}
      </nav>
      {isAuthLoading ? (
        <div className="dashboard__account" aria-live="polite">
          <span className="dashboard__account-copy">
            <small>Loading account...</small>
          </span>
        </div>
      ) : (
        user && (
          <div className="dashboard__account">
            {user.photoURL ? (
              <img
                className="avatar avatar--small"
                src={user.photoURL}
                alt={`${accountName} profile`}
              />
            ) : (
              <span className="avatar avatar--small">{avatarInitial}</span>
            )}
            <span className="dashboard__account-copy">
              <strong>{accountName}</strong>
              <small>{user?.email}</small>
            </span>
            <span aria-hidden="true">•••</span>
          </div>
        )
      )}
      <button type="button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;
