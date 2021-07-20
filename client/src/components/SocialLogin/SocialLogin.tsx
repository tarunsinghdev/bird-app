import { Button } from 'react-bootstrap';

const SocialLogin = () => {
  return (
    <>
      <Button
        onClick={() => alert('You clicked facebook!')}
        style={{ width: '100%' }}
        type="button"
        className="btn-block rounded-pill p-2 "
        block
      >
        <i className="fab fa-facebook-f" style={{ marginRight: 5 }}></i>
        Login with Facebook
      </Button>
      <Button
        onClick={() => alert('You clicked google!')}
        style={{ width: '100%', marginTop: 10 }}
        type="button"
        className="btn-block rounded-pill p-2  btn-danger"
        block
      >
        <i className="fab fa-google" style={{ marginRight: 5 }}></i>
        Login with Google
      </Button>
    </>
  );
};

export default SocialLogin;
