import { useState } from "react";

type IconName =
  | "heart"
  | "compass"
  | "message"
  | "user"
  | "sliders"
  | "bell"
  | "map"
  | "briefcase"
  | "graduation"
  | "x"
  | "star"
  | "rewind"
  | "arrow";

const iconPaths: Record<IconName, React.ReactNode> = {
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
    </>
  ),
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  sliders: <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />,
  map: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  briefcase: <path d="M9 7V4h6v3M3 8h18v11H3V8Zm0 4h18M10 12v2h4v-2" />,
  graduation: <path d="m3 10 9-5 9 5-9 5-9-5Zm4 2.5V17c3 2.5 7 2.5 10 0v-4.5M21 10v6" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  star: <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.7l6.2-.9L12 3Z" />,
  rewind: <path d="M4 8V4m0 0h4M4 4l4 4a7 7 0 1 1-1.5 7.6" />,
  arrow: <path d="m9 18 6-6-6-6" />,
};

function Icon({ name, size = 22, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0"
      fill={filled ? "currentColor" : "none"}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {iconPaths[name]}
    </svg>
  );
}

const profiles = [
  {
    name: "Maya",
    age: 27,
    distance: "2.4 km away",
    role: "Product designer at Arc",
    school: "Parsons School of Design",
    bio: "Sunday markets, tiny jazz bars, and attempting recipes that require way too many pans.",
    tags: ["Live music", "Cooking", "Travel", "Ceramics"],
    image:
      "https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=faces&fit=crop&h=1200&w=900&q=88",
    photographer: "Amin Oussar",
  },
  {
    name: "Nora",
    age: 29,
    distance: "4 km away",
    role: "Architect at North & Co.",
    school: "University of Copenhagen",
    bio: "Always planning the next coastal walk. Ask me about my very opinionated sourdough starter.",
    tags: ["Architecture", "Hiking", "Baking", "Film"],
    image:
      "https://images.unsplash.com/photo-1562532740-dac9bd8c2593?crop=faces&fit=crop&h=1200&w=900&q=88",
    photographer: "Åaker",
  },
  {
    name: "Leah",
    age: 26,
    distance: "6.2 km away",
    role: "Editorial photographer",
    school: "London College of Communication",
    bio: "Golden-hour chaser, secondhand-book collector, and firm believer that breakfast is an all-day meal.",
    tags: ["Photography", "Books", "Coffee", "Road trips"],
    image:
      "https://images.unsplash.com/photo-1770182023898-413f69dbe67c?crop=faces&fit=crop&h=1200&w=900&q=88",
    photographer: "Michael Kyule",
  },
];

function NavItem({
  icon,
  label,
  active,
  badge,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <button
      className={`nav-item ${active ? "nav-item-active" : ""}`}
      type="button"
      aria-current={active ? "page" : undefined}
    >
      <span className="relative">
        <Icon name={icon} size={21} filled={active && icon === "heart"} />
        {badge ? <span className="nav-badge">{badge}</span> : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function App() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [match, setMatch] = useState(false);
  const [notice, setNotice] = useState("");
  const profile = profiles[profileIndex];

  const next = (message: string) => {
    setNotice(message);
    setLiked(false);
    window.setTimeout(() => {
      setProfileIndex((current) => (current + 1) % profiles.length);
      setNotice("");
    }, 320);
  };

  const handleLike = () => {
    setLiked(true);
    window.setTimeout(() => setMatch(true), 240);
  };

  const rewind = () => {
    setNotice("REWIND");
    setLiked(false);
    setProfileIndex((current) => (current - 1 + profiles.length) % profiles.length);
    window.setTimeout(() => setNotice(""), 450);
  };

  const openChat = () => {
    setMatch(false);
    setLiked(false);
    setNotice("CHAT OPENED");
    window.setTimeout(() => setNotice(""), 700);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Icon name="heart" size={20} filled />
          </span>
          <span>kindred</span>
        </div>

        <nav className="nav-stack" aria-label="Primary navigation">
          <NavItem active icon="compass" label="Discover" />
          <NavItem badge={6} icon="heart" label="Likes you" />
          <NavItem badge={2} icon="message" label="Messages" />
        </nav>

        <div className="sidebar-bottom">
          <button className="profile-chip" type="button">
            <span className="avatar">JM</span>
            <span className="min-w-0">
              <strong>Jamie</strong>
              <small>View profile</small>
            </span>
            <Icon name="arrow" size={18} />
          </button>
          <NavItem icon="user" label="My profile" />
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR DAILY PICKS</p>
            <h1>Discover</h1>
          </div>
          <div className="top-actions">
            <button className="icon-button" type="button" aria-label="Notifications">
              <Icon name="bell" size={20} />
              <span className="notification-dot" />
            </button>
            <button className="filter-button" type="button">
              <Icon name="sliders" size={19} />
              <span>Preferences</span>
            </button>
          </div>
        </header>

        <section className="discover-layout" aria-live="polite">
          <div className={`photo-card ${notice ? "card-leaving" : ""} ${liked ? "card-liked" : ""}`}>
            <img src={profile.image} alt={`${profile.name} smiling outdoors`} />
            <div className="photo-shade" />
            <div className="compatibility">
              <span className="compatibility-heart">
                <Icon name="heart" size={15} filled />
              </span>
              <span><strong>94%</strong> match</span>
            </div>
            <div className="photo-progress" aria-label={`Profile ${profileIndex + 1} of ${profiles.length}`}>
              {profiles.map((item, index) => (
                <span key={item.name} className={index === profileIndex ? "active" : ""} />
              ))}
            </div>
            <a
              className="photo-credit"
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
            >
              Photo: {profile.photographer}
            </a>
          </div>

          <article className="profile-details">
            <div className="profile-heading">
              <div>
                <div className="name-row">
                  <h2>{profile.name}, {profile.age}</h2>
                  <span className="verified" aria-label="Verified profile">✓</span>
                </div>
                <p className="location"><Icon name="map" size={17} /> {profile.distance}</p>
              </div>
              <button className="more-button" type="button" aria-label="More options">•••</button>
            </div>

            <div className="facts">
              <p><Icon name="briefcase" size={19} /> {profile.role}</p>
              <p><Icon name="graduation" size={19} /> {profile.school}</p>
            </div>

            <div className="about">
              <p className="section-label">ABOUT</p>
              <p>{profile.bio}</p>
            </div>

            <div>
              <p className="section-label">INTO</p>
              <div className="tag-list">
                {profile.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="prompt-card">
              <p className="section-label">THE WAY TO MY HEART IS</p>
              <p>“Make me laugh when I least expect it.”</p>
            </div>

            <p className="safety-copy">Kindness looks good on everyone. Keep it respectful.</p>
          </article>
        </section>

        <div className="action-dock">
          <button className="round-action rewind-action" type="button" aria-label="Go back" onClick={rewind}>
            <Icon name="rewind" size={21} />
          </button>
          <button
            className="round-action skip-action"
            type="button"
            aria-label="Skip profile"
            onClick={() => next("PASS")}
          >
            <Icon name="x" size={30} />
          </button>
          <button
            className="round-action like-action"
            type="button"
            aria-label="Like profile"
            onClick={handleLike}
          >
            <Icon name="heart" size={32} filled />
          </button>
          <button
            className="round-action star-action"
            type="button"
            aria-label="Send a priority like"
            onClick={() => next("SUPER LIKE")}
          >
            <Icon name="star" size={23} />
          </button>
        </div>

        {notice ? <div className="action-notice">{notice}</div> : null}
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <NavItem active icon="compass" label="Discover" />
        <NavItem icon="heart" label="Likes" badge={6} />
        <NavItem icon="message" label="Chats" badge={2} />
        <NavItem icon="user" label="Profile" />
      </nav>

      {match ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="match-title">
          <div className="match-modal">
            <div className="match-hearts">
              <span className="match-avatar match-avatar-you">JM</span>
              <span className="match-icon"><Icon name="heart" size={24} filled /></span>
              <img className="match-avatar" src={profile.image} alt="" />
            </div>
            <p className="match-kicker">IT’S A MATCH</p>
            <h2 id="match-title">You and {profile.name} like each other</h2>
            <p>Don’t leave a good thing waiting. Say hello and see where it goes.</p>
            <button className="primary-button" type="button" onClick={openChat}>
              Send a message
            </button>
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setMatch(false);
                next("LIKED");
              }}
            >
              Keep discovering
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
