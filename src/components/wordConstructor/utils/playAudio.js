const playAudio = (sound) => {
  const audio = new Audio();
  audio.currentTime = 0;
  audio.preload = 'auto';
  audio.src = sound;
  audio.play();
  setTimeout(() => audio.pause(), 4000);
};
export default playAudio;
