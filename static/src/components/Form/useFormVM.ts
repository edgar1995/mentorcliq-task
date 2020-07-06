import throttle from 'lodash.throttle';
import { ObjectSchema } from 'yup';
import { useState } from 'react';
import ReactDOM from 'react-dom';

interface IUseFormVMParams {
  onSubmit: (values: { [key: string]: string | number; }, event: any) => void;
  validationScheme: ObjectSchema<any>;
  initialValues: {
    [key: string]: string | number;
  };
}

export function useFormVM({ onSubmit, initialValues, validationScheme }: IUseFormVMParams) {
  const [touched, setTouched] = useState(() => {
    const initialTouched = {};

    Object.keys(initialValues)
      .forEach((key) => {
        initialTouched[key] = !!initialValues[key];
      });

    return initialTouched;
  });

  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = throttle((values) => {
    validationScheme
      .validate(values, { abortEarly: false })
      .then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          setValues(values);
          setErrors({});
        });
      })
      .catch((error) => {
        const nextErrors = {};

        error.inner.forEach(({ errors: [message], path }) => {
          if (message) {
            nextErrors[path] = message;
          }
        });

        ReactDOM.unstable_batchedUpdates(() => {
          setValues(values);
          setErrors(nextErrors);
        });
      });
  }, 300);

  function handleInputChange({ currentTarget: { name, value } }) {
    const nextValues = {
      ...values,
      [name]: value,
    };

    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true,
      });
    }

    validate(nextValues);
  }

  function handleFromSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    validationScheme
      .validate(values, { abortEarly: false })
      .then(() => {
        setIsLoading(false);
        onSubmit(values, event);
      })
      .catch((error) => {
        const nextErrors = {};

        error.inner.forEach(({ errors: [message], path }) => {
          if (message) {
            nextErrors[path] = message;
          }
        });

        ReactDOM.unstable_batchedUpdates(() => {
          setErrors(nextErrors);
          setIsLoading(false);
        });
      });
  }

  return {
    handleInputChange,
    handleFromSubmit,
    isLoading,
    touched,
    values,
    errors,
  };
}
