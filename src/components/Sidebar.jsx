import xLogo from "../assets/X-Logo.png";

const navItems = [
  ["⌂", "Home", true],
  ["⌕", "Explore"],
  ["♧", "Notifications"],
  ["✉", "Messages"],
  ["▣", "Lists"],
  ["♙", "Profile"],
  ["•••", "More"],
];

function Sidebar({ onCompose }) {
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
      <button
        className="dashboard__post-button"
        type="button"
        onClick={onCompose}
      >
        Post
      </button>
      <div className="dashboard__account">
        <span className="avatar avatar--small">A</span>
        <span className="dashboard__account-copy">
          <strong>Alex Morgan</strong>
          <small>@alexmorgan</small>
        </span>
        <span aria-hidden="true">•••</span>
      </div>
    </aside>
  );
}

export default Sidebar;
