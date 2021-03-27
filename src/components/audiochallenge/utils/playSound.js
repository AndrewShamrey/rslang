const playSound = (file) => {
  const audio = new Audio(file);
  audio.play();
};

export default playSound;
