import "../styles/Profile.css";

function Profile({ profile, onBack, onEdit }) {
  return (
    <main className="profile">
      <button className="profile__back" type="button" onClick={onBack}>
        Back to Home
      </button>
      <h1>{profile.displayName}</h1>
      <p>@{profile.username}</p>
      <button type="button" onClick={onEdit}>
        Edit Profile
      </button>
    </main>
  );
}

export default Profile;
