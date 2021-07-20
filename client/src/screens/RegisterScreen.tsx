import { Formik, Form } from 'formik';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';

import MyTextInput from '../components/form/MyTextInput';
import SocialLogin from '../components/SocialLogin/SocialLogin';

const RegisterScreen: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ height: '100vh' }}>
        <Col xs={12} lg={5}>
          <Image
            src="/images/twitter.svg"
            style={{ width: '10%', marginTop: 30, marginBottom: 30 }}
          />
          <h2>Create your account</h2>
          <Formik
            initialValues={{ userName: '', email: '', password: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .trim()
                .required(),
              lastName: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .trim()
                .required(),
              userName: Yup.string()
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
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                console.log(values);
                // axios.post('/api/signup');
                alert('Form Submitted!');
              } catch (error) {
                console.log('Error');
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
                  name="userName"
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
};

export default RegisterScreen;
