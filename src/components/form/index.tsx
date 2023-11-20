import React, {ReactNode} from 'react';
import {Formik, FormikHelpers} from 'formik';

interface Props<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
  children: ReactNode;
}

const Form = <T extends object>(props: Props<T>) => {
  const {initialValues, validationSchema, onSubmit, children} = props;
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {children}
    </Formik>
  );
};

export default Form;
