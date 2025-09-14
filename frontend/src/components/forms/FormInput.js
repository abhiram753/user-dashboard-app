import React, { forwardRef } from 'react';

const FormInput = forwardRef((
  {
    label,
    error,
    type = 'text',
    inputClass = '',
    labelClass = '',
    errorClass = '',
    required = false,
    ...props
  },
  ref
) => {
  // Bootstrap form-control plus error class
  const classNames = `form-control${error ? ' is-invalid' : ''} ${inputClass}`.trim();

  return (
    <div className="mb-3">
      {label && (
        <label className={`form-label ${labelClass}`}>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={classNames}
        required={required}
        {...props}
      />
      {error && <div className={`invalid-feedback ${errorClass}`}>{error}</div>}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
