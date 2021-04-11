const playSound = (file) => {
  const audio = new Audio(file);
  audio.play();
  return audio;
};

export default playSound;
