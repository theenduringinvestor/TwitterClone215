import "../styles/Dashboard.css";
import { useRef, useState } from "react";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import Timeline from "./Timeline";

const posts = [
  {
    name: "X",
    handle: "@X",
    time: "2h",
    avatar: "X",
    text: "What is happening?!",
    comments: "1.2K",
    reposts: "4.8K",
    likes: "28K",
  },
  {
    name: "Design Daily",
    handle: "@designdaily",
    time: "4h",
    avatar: "D",
    text: "The best interfaces get out of the way and let the idea take the stage.",
    comments: "84",
    reposts: "312",
    likes: "2.6K",
  },
  {
    name: "Tech News",
    handle: "@technews",
    time: "6h",
    avatar: "T",
    text: "A little progress every day adds up to something remarkable.",
    comments: "219",
    reposts: "740",
    likes: "5.1K",
  },
];

function Dashboard() {
  const [timelinePosts, setTimelinePosts] = useState(posts);
  const [draft, setDraft] = useState("");
  const composerRef = useRef(null);

  function handlePost() {
    const text = draft.trim();

    if (!text) {
      composerRef.current?.focus();
      return;
    }

    setTimelinePosts((currentPosts) => [
      {
        name: "Aaron Mitchell",
        handle: "@wttp.mp4",
        time: "now",
        avatar: "A",
        text,
        comments: "0",
        reposts: "0",
        likes: "0",
        id: Date.now(),
      },
      ...currentPosts,
    ]);
    setDraft("");
  }

  function handleDelete(postId) {
    setTimelinePosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  }

  return (
    <section className="dashboard" aria-label="Home timeline">
      <Sidebar onCompose={() => composerRef.current?.focus()} />
      <Timeline
        posts={timelinePosts}
        composerRef={composerRef}
        draft={draft}
        onDraftChange={setDraft}
        onPost={handlePost}
        onDelete={handleDelete}
      />
      <Rightbar />
    </section>
  );
}

export default Dashboard;
