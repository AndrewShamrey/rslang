import './starsList.scss';

const StarsList = ({ amount, starsLeft }) => {
  const starsArr = [];

  for (let i = 0; i < amount; i += 1) {
    if ((amount - starsLeft) <= i) {
      starsArr.push(<i className="fas fa-star" key={i} />);
    } else {
      starsArr.push(<i className="far fa-star" key={i} />);
    }
  }

  return (
    <div className="stars-block">
      {starsArr}
    </div>
  );
};

export default StarsList;
