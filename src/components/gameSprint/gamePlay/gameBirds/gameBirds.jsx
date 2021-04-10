const ShowBirds = ({ stringOfRights }) => (
  <div className="game-play__birds">
    <div className="line" />
    {stringOfRights >= 0 && (
      <div className="bird bird-1" />
    )}
    {stringOfRights >= 4 && (
      <div className="bird bird-2" />
    )}
    {stringOfRights >= 8 && (
      <div className="bird bird-3" />
    )}
    {stringOfRights >= 12 && (
      <div className="bird bird-4" />
    )}
  </div>
);

export default ShowBirds;
