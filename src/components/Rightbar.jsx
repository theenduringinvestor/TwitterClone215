function Rightbar() {
  return (
    <aside className="dashboard__rightbar">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Search" />
      </label>
      <section className="side-panel">
        <h2>Subscribe to Premium</h2>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button type="button">Subscribe</button>
      </section>
      <section className="side-panel trends">
        <h2>What’s happening</h2>
        <div className="trend">
          <small>Trending in Technology</small>
          <strong>Artificial Intelligence</strong>
          <small>12.4K posts</small>
        </div>
        <div className="trend">
          <small>Trending</small>
          <strong>Design systems</strong>
          <small>8,921 posts</small>
        </div>
        <div className="trend">
          <small>Trending in Business</small>
          <strong>Productivity</strong>
          <small>5,204 posts</small>
        </div>
        <button className="show-more" type="button">
          Show more
        </button>
      </section>
    </aside>
  );
}

export default Rightbar;
