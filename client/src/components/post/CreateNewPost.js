import React, { useState } from 'react';
import { createPost } from '../../helper/post/index';
import { isAuthenticated } from '../../helper/auth/index';

export default function CreateNewPost() {
  const [content, setContent] = useState('');
  const { user, token } = isAuthenticated();

  const disableText = (event) => {
    let bt = document.getElementById('submitPostButton');
    if (event.target.value.trim() !== '') {
      bt.disabled = false;
    } else {
      bt.disabled = true;
    }
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //backend request fired
    createPost(user._id, token, { content }).then((data) => {
      if (data.error) {
        //setError(true);
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
        <textarea
          placeholder="what's happening?"
          id="postTextArea"
          onKeyUp={disableText}
          onChange={handleChange}
        ></textarea>
        <div className="buttonContainer">
          <button onClick={onSubmit} id="submitPostButton">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
