import './backdrop.scss';

const Backdrop = ({ children, additionalClassName = '' }) => (
  <div className={additionalClassName ? `backdrop ${additionalClassName}` : 'backdrop'}>
    {children}
  </div>
);

export default Backdrop;
