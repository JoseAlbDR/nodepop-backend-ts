import { IFormRowProps } from '../types/FormRow';

const FormRow = ({ type, name, labelText, defaultValue }: IFormRowProps) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ''}
        required
      />
    </div>
  );
};

export default FormRow;
