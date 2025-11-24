export function getMainArtist(album) {
  if (!album?.tracks?.length) return "Artista desconhecido";

  const artistCount = {};

  album.tracks.forEach(track => {
    track.artists?.forEach(a => {
      artistCount[a.name] = (artistCount[a.name] || 0) + 1;
    });
  });

  // pegar o artista com maior contagem
  const mainArtist = Object.keys(artistCount).reduce((a, b) =>
    artistCount[a] > artistCount[b] ? a : b
  );

  return mainArtist;
}