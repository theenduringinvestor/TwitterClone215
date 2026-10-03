import "../styles/Dashboard.css";
import { useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import Timeline from "./Timeline";

const posts = [];

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

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <section className="dashboard" aria-label="Home timeline">
      <Sidebar
        onCompose={() => composerRef.current?.focus()}
        onLogout={handleLogout}
      />
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
