import Composer from "./Composer";
import Post from "./Post";

function Timeline({
  posts,
  composerRef,
  draft,
  onDraftChange,
  onPost,
  onDelete,
}) {
  return (
    <main className="dashboard__timeline">
      <header className="dashboard__header">
        <h1>Home</h1>
        <button
          className="dashboard__settings"
          type="button"
          aria-label="Timeline settings"
        >
          ⚙
        </button>
      </header>
      <Composer
        composerRef={composerRef}
        draft={draft}
        onDraftChange={onDraftChange}
        onPost={onPost}
      />
      <div className="timeline__posts">
        {posts.map((post) => (
          <Post key={post.id || post.handle} post={post} onDelete={onDelete} />
        ))}
      </div>
    </main>
  );
}

export default Timeline;
