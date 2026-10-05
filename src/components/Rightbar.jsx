function Rightbar() {
  return (
    <aside className="dashboard__rightbar">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Search" />
      </label>
      <section className="side-panel trends">
        <h2>What’s happening</h2>
      </section>
    </aside>
  );
}

export default Rightbar;
