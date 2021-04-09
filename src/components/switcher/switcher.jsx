import './switcher.scss';

const Switcher = ({ isChecked = true, onChange, id }) => (
  <label
    className="switcher s-success"
    htmlFor={id}
  >
    <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={onChange}
    />
    <span className="slider round" />
  </label>
);

export default Switcher;
