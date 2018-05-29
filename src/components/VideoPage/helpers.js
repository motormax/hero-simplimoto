export function attachTracks(participantTracks, container) {
  const tracks = Array.from(participantTracks.values());
  tracks.forEach((track) => {
    container.appendChild(track.attach());
  });
}

export function detachParticipantTracks(participant) {
  const tracks = Array.from(participant.tracks.values());
  detachTracks(tracks);
}

export function detachTracks(tracks) {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove();
    });
  });
}
