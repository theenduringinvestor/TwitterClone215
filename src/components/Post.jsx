function Post({ post, onDelete }) {
  const isOwnPost = post.handle === "@alexmorgan";

  return (
    <article className="post">
      <span className={`avatar avatar--${post.avatar.toLowerCase()}`}>
        {post.avatar}
      </span>
      <div className="post__content">
        <div className="post__meta">
          <strong>{post.name}</strong>
          <span>{post.handle}</span>
          <span>·</span>
          <span>{post.time}</span>
          {isOwnPost ? (
            <button type="button" onClick={() => onDelete(post.id)}>
              Delete
            </button>
          ) : (
            <button type="button" aria-label={`More options for ${post.name}`}>
              •••
            </button>
          )}
        </div>
        <p>{post.text}</p>
        <div className="post__actions">
          <button type="button">
            ♡ <span>{post.comments}</span>
          </button>
          <button type="button">
            ♧ <span>{post.reposts}</span>
          </button>
          <button type="button">
            ♡ <span>{post.likes}</span>
          </button>
          <button type="button">↗</button>
        </div>
      </div>
    </article>
  );
}

export default Post;
