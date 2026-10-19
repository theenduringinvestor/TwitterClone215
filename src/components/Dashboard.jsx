import "../styles/Dashboard.css";
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import ProfileSetup from "./ProfileSetup";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import Timeline from "./Timeline";

const postsCollection = collection(db, "posts");
const WRITE_TIMEOUT_MS = 10000;

function describeError(prefix, err) {
  const detail = err?.code || err?.message || "unknown error";
  return `${prefix} (${detail}).`;
}

function withTimeout(promise) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            "Firestore did not respond. Check that the database is created and your rules allow this write.",
          ),
        ),
      WRITE_TIMEOUT_MS,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function formatTime(date) {
  if (!date) return "now";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function toTimelinePost(id, data, currentUid) {
  const name = data.authorName || "User";
  return {
    id,
    uid: data.uid,
    isOwn: data.uid === currentUid,
    name,
    handle: data.authorHandle || "",
    avatar: name.charAt(0).toUpperCase() || "U",
    time: formatTime(data.createdAt?.toDate?.()),
    text: data.text,
    comments: "0",
    reposts: "0",
    likes: "0",
  };
}

function Dashboard() {
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const composerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      try {
        const snap = await getDoc(doc(db, "users", uid));
        if (cancelled) return;
        setProfile(snap.exists() ? snap.data() : null);
        setProfileLoaded(true);
      } catch (err) {
        console.error("Failed to load profile:", err);
        if (!cancelled) setError(describeError("Could not load profile", err));
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSaveProfile({ displayName, username }) {
    const user = auth.currentUser;
    if (!user) return false;
    try {
      const data = { displayName, username };
      await withTimeout(setDoc(doc(db, "users", user.uid), data));
      setProfile(data);
      setError("");
      return true;
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(describeError("Could not save profile", err));
      return false;
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const snapshot = await getDocs(
          query(postsCollection, orderBy("createdAt", "desc")),
        );
        if (cancelled) return;
        const uid = auth.currentUser?.uid;
        setTimelinePosts(
          snapshot.docs.map((d) => toTimelinePost(d.id, d.data(), uid)),
        );
        setError("");
      } catch (err) {
        console.error("Failed to load posts:", err);
        if (!cancelled) setError(describeError("Could not load posts", err));
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handlePost() {
    const text = draft.trim();

    if (!text) {
      composerRef.current?.focus();
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("You must be signed in to post.");
      return;
    }

    if (!profile) {
      setError("Please finish setting up your profile first.");
      return;
    }

    const authorName = profile.displayName;
    const authorHandle = `@${profile.username}`;

    try {
      const data = { uid: user.uid, authorName, authorHandle, text };
      const ref = await withTimeout(
        addDoc(postsCollection, {
          ...data,
          createdAt: serverTimestamp(),
        }),
      );
      setTimelinePosts((currentPosts) => [
        toTimelinePost(ref.id, data, user.uid),
        ...currentPosts,
      ]);
      setDraft("");
      setError("");
    } catch (err) {
      console.error("Failed to save post:", err);
      setError(describeError("Could not save your post", err));
    }
  }

  async function handleDelete(postId) {
    try {
      await withTimeout(deleteDoc(doc(db, "posts", postId)));
      setTimelinePosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );
      setError("");
    } catch (err) {
      console.error("Failed to delete post:", err);
      setError(describeError("Could not delete the post", err));
    }
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
      {error && (
        <p className="dashboard__error" role="alert">
          {error}
        </p>
      )}
      <Timeline
        posts={timelinePosts}
        composerRef={composerRef}
        draft={draft}
        onDraftChange={setDraft}
        onPost={handlePost}
        onDelete={handleDelete}
      />
      <Rightbar />
      {profileLoaded && !profile && <ProfileSetup onSave={handleSaveProfile} />}
    </section>
  );
}

export default Dashboard;
