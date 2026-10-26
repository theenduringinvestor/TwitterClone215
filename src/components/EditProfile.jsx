import { useState } from "react";
import "../styles/EditProfile.css";

function EditProfile({ profile, onSave, onCancel }) {
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");

  function handleSubmit(event) {
    event.preventDefault();

    const name = displayName.trim();

    if (name.length === 0) return;

    onSave({ displayName: name });
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
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditProfile;
