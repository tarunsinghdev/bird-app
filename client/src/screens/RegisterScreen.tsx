import { Formik, Form } from 'formik';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { isAuthenticated, signup } from '../helper/auth/index';

import MyTextInput from '../components/form/MyTextInput';
import SocialLogin from '../components/form/SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { Redirect, useHistory } from 'react-router-dom';

const RegisterScreen: React.FC = () => {
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

  const signupForm = () => (
    <Container>
      <Row className="justify-content-md-center" style={{ height: '100vh' }}>
        <Col xs={12} lg={5}>
          <Image
            src="/images/twitter.svg"
            style={{ width: '10%', marginTop: 30, marginBottom: 30 }}
          />
          <h2>Create your account</h2>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              authError: '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .trim()
                .required(),
              lastName: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .trim()
                .required(),
              username: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .trim()
                .required(),
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
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Password do not match')
                .required(),
            })}
            onSubmit={async (
              values,
              { setSubmitting, setErrors, resetForm }
            ) => {
              const { firstName, lastName, username, email, password } = values;
              try {
                const response = await signup({
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                });
                const res = await response.json();
                console.log(res);
                if (res.error && res.error.keyPattern.username === 1) {
                  //TODO: set ERROR username is already exists
                  throw Error('Username already exists');
                }
                if (res.error && res.error.keyPattern.email === 1) {
                  //TODO: set ERROR email is already exists please login
                  throw Error('Email already exists, please login');
                }
                //TODO: if no error set input field to empty and show success message
                resetForm({});
                toast.success('Registration success');
              } catch (error) {
                if (error.message.startsWith('E')) {
                  setErrors({ email: error.message });
                } else {
                  setErrors({ username: error.message });
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, errors }) => (
              <Form>
                <Row>
                  <Col>
                    <MyTextInput
                      label="Firstname"
                      name="firstName"
                      placeholder="Firstname"
                    />
                  </Col>
                  <Col>
                    <MyTextInput
                      label="Lastname"
                      name="lastName"
                      placeholder="Lastname"
                    />
                  </Col>
                </Row>
                <MyTextInput
                  label="Username"
                  name="username"
                  placeholder="Username"
                />
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
                <MyTextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                />
                <Button
                  style={{ width: '100%', marginTop: 20 }}
                  disabled={!isValid || !dirty || isSubmitting}
                  type="submit"
                  className="btn-block rounded-pill p-2 btn-info"
                >
                  {isSubmitting ? <Spinner animation="border" /> : 'Register'}
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

  return (
    <>
      {performRedirect()}
      {signupForm()}
    </>
  );
};

export default RegisterScreen;
