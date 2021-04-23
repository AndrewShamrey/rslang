import preloader from '../../assets/img/preloader.svg';
import './preloader.scss';

const Preloader = () => (
  <div className="preloader-container">
    <img src={preloader} className="preloader" alt="loader" />
  </div>
);

export default Preloader;
