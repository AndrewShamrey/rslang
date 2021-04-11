import './switcher.scss';

const Switcher = ({
  isChecked = true,
  onChange,
  id,
  color = 'green',
  additionalClassName = '',
  round,
  type = 'solid',
}) => (
  <label
    className={`switcher switcher_${type} switcher_${color} ${additionalClassName}`}
    htmlFor={id}
  >
    <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={onChange}
    />
    <span className={`slider ${round && 'switcher_round'}`} />
  </label>
);

export default Switcher;
