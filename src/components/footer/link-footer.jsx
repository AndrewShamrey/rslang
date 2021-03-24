import icon from '../../assets/images/github.svg';

const Link = ({ value, href }) => (
  <a className="footer-link" href={href} target="_blank" rel="noreferrer">
    <img className="footer-link-icon" src={icon} alt="icon" />
    {value}
  </a>
);

export default Link;
