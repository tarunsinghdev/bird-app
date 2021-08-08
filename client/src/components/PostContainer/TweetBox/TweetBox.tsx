import { Form, Formik } from 'formik';
import React from 'react';
import { Button, Image, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import MyTextInput from '../../form/MyTextInput';

const TweetBox = () => {
  return (
    <div className="tweetbox border">
      <Image
        style={{ width: 50, height: 50, borderRadius: '50%' }}
        src="/images/user.png"
        alt="user"
      />
      <Formik
        initialValues={{ tweet: '' }}
        validationSchema={Yup.object({
          tweet: Yup.string().max(280, 'Must be 280 characters or less').trim(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            toast.success('Tweet success');
          } catch (error) {
            setErrors({ tweet: error.message });
            toast.error('Must be 280 characters or less');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form>
            <MyTextInput
              label=""
              as="textarea"
              row={4}
              name="tweet"
              placeholder="What's happening?"
            />
            {/* {errors.tweet && <p className="text-danger">{errors.tweet}</p>} */}
            <Button
              className="mt-2 rounded-pill "
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Spinner animation="border" /> : 'Tweet'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TweetBox;
