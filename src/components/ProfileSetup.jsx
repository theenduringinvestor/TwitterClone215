import { useState } from "react";

function ProfileSetup({ onSave }) {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const name = displayName.trim();
    const handle = username.trim().replace(/^@+/, "");
    if (!name || !handle) return;

    setSaving(true);
    const saved = await onSave({ displayName: name, username: handle });
    if (!saved) setSaving(false);
  }

  return (
    <div className="profile-setup" role="dialog" aria-label="Set up your profile">
      <form className="profile-setup__form" onSubmit={handleSubmit}>
        <h2>Set up your profile</h2>
        <label>
          Display name
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            maxLength={50}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            maxLength={30}
            required
          />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
