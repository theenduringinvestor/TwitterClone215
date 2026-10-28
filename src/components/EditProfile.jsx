import { useState } from "react";
import "../styles/EditProfile.css";

function EditProfile({ profile, onSave, onCancel }) {
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");

  function handleSubmit(event) {
    event.preventDefault();

    const name = displayName.trim();

    if (name.length === 0) return;

    onSave({ displayName: name, bio: bio.trim() });
  }

  return (
    <form className="edit-profile" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <label htmlFor="edit-display-name">Display name</label>

      <input
        id="edit-display-name"
        type="text"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
        maxLength={50}
      />
      <label htmlFor="edit-bio">Bio(optional)</label>
      <textarea
        id="edit-bio"
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        maxLength={160}
        rows={4}
      />
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditProfile;
