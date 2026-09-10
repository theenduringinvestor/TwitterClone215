function Composer({ composerRef, draft, onDraftChange, onPost }) {
  return (
    <section className="composer" aria-label="Create a post">
      <span className="avatar">A</span>
      <div className="composer__body">
        <textarea
          ref={composerRef}
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="What is happening?!"
          aria-label="Post text"
          rows="2"
        />
        <div className="composer__footer">
          <span className="composer__tools" aria-label="Post tools">
            ◉ ▣ ☺ ◌
          </span>
          <button type="button" onClick={onPost}>
            Post
          </button>
        </div>
      </div>
    </section>
  );
}

export default Composer;
