import { ChangeEvent, createContext } from 'react';

export interface IFormContextProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  touched: {
    [name: string]: boolean;
  };
  values: {
    [name: string]: any;
  };
  errors: {
    [name: string]: string;
  };
}

export const FormContext = createContext<IFormContextProps>({
  handleInputChange: (event) => {},
  touched: {},
  values: {},
  errors: {},
});
