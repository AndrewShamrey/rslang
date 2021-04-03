const playAudio = (sound, isStart = false) => {
  const audio = new Audio();
  if (!isStart) audio.currentTime = 0;
  audio.preload = 'auto';
  audio.src = sound;
  audio.play();
  if (isStart) setTimeout(() => audio.pause(), 4000);
};
export default playAudio;
