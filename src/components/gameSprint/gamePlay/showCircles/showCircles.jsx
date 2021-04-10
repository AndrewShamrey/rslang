import './showCircles.scss';

const ShowCircles = ({ stringOfRights }) => {
  let circles = '';
  if (stringOfRights < 16) {
    if (stringOfRights % 4 === 0) {
      circles = (
        <div className="circles-line">
          <i className="far fa-circle circle" />
          <i className="far fa-circle circle" />
          <i className="far fa-circle circle" />
        </div>
      );
    } else if ((stringOfRights - 1) % 4 === 0) {
      circles = (
        <div className="circles-line">
          <i className="far fa-check-circle circle" />
          <i className="far fa-circle circle" />
          <i className="far fa-circle circle" />
        </div>
      );
    } else if (stringOfRights % 2 === 0) {
      circles = (
        <div className="circles-line">
          <i className="far fa-check-circle circle" />
          <i className="far fa-check-circle circle" />
          <i className="far fa-circle circle" />
        </div>
      );
    } else {
      circles = (
        <div className="circles-line">
          <i className="far fa-check-circle circle" />
          <i className="far fa-check-circle circle" />
          <i className="far fa-check-circle circle" />
        </div>
      );
    }
  }

  return (
    <div className="game-play__upper_circles">
      {stringOfRights < 16 && (circles)}
      {stringOfRights >= 16 && (
        <div className="circles-line">
          <i className="circle fas fa-check-circle" />
        </div>
      )}
    </div>
  );
};

export default ShowCircles;
