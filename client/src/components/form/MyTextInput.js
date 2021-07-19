import { useField } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        {...props}
        isInvalid={meta.touched && !!meta.error}
      />
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default MyTextInput;
