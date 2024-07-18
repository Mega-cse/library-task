import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    validationSchema.validate(values)
      .then(() => {
      
        console.log("Form is valid. Logging in...");
        navigate('/dashboard');
      })
      .catch((error) => {
        
        console.error("Form validation failed:", error.errors);
      });
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='login'>
              <div className='form'>
                <span>Login</span>
                <Field type="email" name="email" placeholder="Enter email id / username" className="form-control inp_text" />
                <ErrorMessage name="email" component="div" className="error" />
                <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
                <button type="submit" disabled={isSubmitting}>Login</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
