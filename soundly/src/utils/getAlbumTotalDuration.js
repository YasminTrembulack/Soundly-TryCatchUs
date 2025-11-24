export function getAlbumTotalDuration(tracks) {
  if (!tracks || tracks.length === 0) return "0:00";

  // Soma todos os duration_ms
  const totalMs = tracks.reduce((sum, track) => sum + (track.duration_ms || 0), 0);

  // Converte para segundos
  const totalSeconds = Math.floor(totalMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Se tiver horas, mostra HH:MM:SS, senão só MM:SS
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
