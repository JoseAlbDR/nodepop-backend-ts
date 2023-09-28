import { SubmitFunction } from 'react-router-dom';

export interface IFormRowProps {
  type: string;
  name: string;
  labelText: string;
  defaultValue: string;
  disabled?: boolean;
  onChange?: SubmitFunction;
}
