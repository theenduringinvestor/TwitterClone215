import xLogo from "../assets/X-Logo.png";

const navItems = [
  ["⌂", "Home", true],
  ["♧", "Notifications"],
  ["✉", "Messages"],
  ["▣", "Lists"],
  ["♙", "Profile"],
  ["•••", "Buy Issue"],
];

function Sidebar({ onLogout }) {
  return (
    <aside className="dashboard__sidebar">
      <img className="dashboard__logo" src={xLogo} alt="X" />
      <nav className="dashboard__nav" aria-label="Primary navigation">
        {navItems.map(([icon, label, active]) => (
          <button
            className={active ? "is-active" : ""}
            key={label}
            type="button"
          >
            <span aria-hidden="true">{icon}</span>
            <strong>{label}</strong>
          </button>
        ))}
      </nav>
      <div className="dashboard__account">
        <span className="avatar avatar--small">A</span>
        <span className="dashboard__account-copy">
          <strong>Alex Morgan</strong>
          <small>@alexmorgan</small>
        </span>
        <span aria-hidden="true">•••</span>
      </div>
      <button type="button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;
