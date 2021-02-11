import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';
import React, { forwardRef, useMemo } from 'react';

export const FormTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, ...props }, ref) => {
    const [field, meta] = useField(name);

    return useMemo(
      () => (
        <TextField
          error={!!meta.touched && !!meta.error}
          helperText={
            !!meta.touched ? (meta.error ? meta.error : undefined) : undefined
          }
          ref={ref}
          {...field}
          {...props}
        />
      ),
      [field, meta.error, meta.touched, props, ref],
    );
  },
);
