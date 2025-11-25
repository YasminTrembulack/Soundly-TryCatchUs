export const getPlaylistIcon = (iconType) => {
  const icons = {
    // ========= Ícones originais =========
    "musical-notes": "🎵",
    favorites: "❤",
    heart: "❤️",
    star: "⭐",
    headset: "🎧",
    experiment: "🧪",
    trophy: "🏆",
    cloud: "☁️",

    // ========= Moods =========
    chill: "😌",
    happy: "😄",
    sad: "😢",
    angry: "😡",
    focus: "🎯",
    relax: "🌿",
    sleep: "😴",
    energy: "⚡",
    party: "🎉",
    romantic: "💘",
    nostalgic: "📼",
    study: "📚",
    vibe: "✨",

    // ========= Atividades =========
    workout: "🏋️",
    running: "🏃‍♂️",
    driving: "🚗",
    traveling: "✈️",
    cooking: "🍳",
    cleaning: "🧹",
    gaming: "🎮",
    meditation: "🧘‍♂️",

    // ========= Gêneros musicais =========
    rock: "🎸",
    metal: "🤘",
    pop: "🎤",
    trap: "🔥",
    jazz: "🎷",
    blues: "🎺",
    classical: "🎻",
    electronic: "🔊",
    reggaeton: "💃",

    // ========= Temáticos =========
    summer: "🌞",
    winter: "❄️",
    rain: "🌧️",
    beach: "🏖️",
    space: "🚀",
    galaxy: "🌌",
    dark: "🌑",
    light: "🔆",
    neon: "💡",
  };

  return icons[iconType] || "🎵";
};
