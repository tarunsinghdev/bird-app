import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { signin, isAuthenticated, authenticate } from '../helper/auth/index';
import { Redirect, useHistory } from 'react-router-dom';

import MyTextInput from '../components/form/MyTextInput';
import SocialLogin from '../components/form/SocialLogin/SocialLogin';
import { toast } from 'react-toastify';

const LoginScreen: React.FC = () => {
  const history = useHistory();

  const performRedirect = () => {
    const { user } = isAuthenticated();
    if (user) {
      return history.push('/home');
    }
    if (isAuthenticated()) {
      return <Redirect to="/login" />;
    }
  };

  const signinForm = () => {
    return (
      <Container>
        <Row className="justify-content-md-center" style={{ height: '100vh' }}>
          <Col xs={12} lg={5}>
            <Image
              src="/images/twitter.svg"
              style={{ width: '10%', marginTop: 30, marginBottom: 30 }}
            />
            <h2>Log in to Twitter</h2>
            <Formik
              initialValues={{ email: '', password: '', authError: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required()
                  .email('Invalid email address')
                  .trim(),
                password: Yup.string()
                  .matches(
                    /^[0-9A-Za-z]*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[0-9a-zA-Z]*$/,
                    'Need atleast one special character'
                  )
                  .required()
                  .trim(),
              })}
              onSubmit={async (
                values,
                { setSubmitting, setErrors, resetForm }
              ) => {
                try {
                  const response = await signin(values);
                  const res = await response.json();
                  console.log(res);
                  if (res.error) {
                    throw Error(res.error);
                  }
                  toast.success('Successfully signed in');
                  authenticate(res);
                  resetForm({});
                  history.push('/home');
                } catch (error) {
                  setErrors({ authError: error.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <MyTextInput
                    label="Email Address"
                    name="email"
                    placeholder="Email Address"
                  />
                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  {errors.authError && (
                    <p style={{ color: 'red' }}>{errors.authError}</p>
                  )}
                  <Button
                    style={{ width: '100%', marginTop: 20 }}
                    disabled={!isValid || !dirty || isSubmitting}
                    type="submit"
                    className="btn-block rounded-pill p-2 btn-info"
                  >
                    {isSubmitting ? <Spinner animation="border" /> : 'Login'}
                  </Button>

                  <p className="text-center " style={{ marginTop: 10 }}>
                    <span>OR</span>
                  </p>
                  <SocialLogin />
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {performRedirect()}
      {signinForm()}
    </>
  );
};

export default LoginScreen;
