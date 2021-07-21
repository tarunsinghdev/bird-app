import React, { useState } from 'react';
import { createPost } from '../../helper/post/index';
import { isAuthenticated } from '../../helper/auth/index';

import { toast } from 'react-toastify';

export default function CreateNewPost() {
  const [content, setContent] = useState('');
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //backend request fired
    createPost(user._id, token, { content }).then((data) => {
      if (data.error) {
        //setError(true);
        toast.error('This is an error');
      } else {
        //setError('');
        //setSuccess(true);
        //setcontent empty and button disabled
        setContent('');
      }
    });
  };

  return (
    <div className="postFormContainer">
      <div className="userImageContainer">
        <img src="/images/defaultProfilePic.jpg" alt="User's Profile Pic" />
      </div>
      <div className="textareaContainer">
        <form onSubmit={onSubmit}>
          <textarea
            value={content}
            placeholder="what's happening?"
            id="postTextArea"
            onChange={handleChange}
          ></textarea>
          <div className="buttonContainer">
            <button
              type="submit"
              disabled={content === '' ? true : false}
              id="submitPostButton"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
