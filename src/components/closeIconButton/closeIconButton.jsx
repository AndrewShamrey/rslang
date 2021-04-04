import './closeIconButton.scss';

const CloseIconButton = ({ onClick, additionalClassName = '' }) => (
  <button
    className={additionalClassName ? `close-icon-btn ${additionalClassName}` : 'close-icon-btn'}
    onClick={onClick}
    type="button"
  >
    <i className="fas fa-times" />
  </button>
);

export default CloseIconButton;
