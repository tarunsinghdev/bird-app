import React from 'react';
import { createPost } from '../../helper/post/index';
import { isAuthenticated } from '../../helper/auth/index';

export default function CreateNewPost() {
  const { user, token } = isAuthenticated();
  const disableText = (event) => {
    let bt = document.getElementById('submitPostButton');
    if (event.target.value.trim() !== '') {
      bt.disabled = false;
    } else {
      bt.disabled = true;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const tweet = event.target.value;
    //backend request fired
    createPost(user._id, token, { tweet }).then((data) => {
      if (data.error) {
        //setError(true);
      } else {
        //setError('');
        //setSuccess(true);
        //setcontent empty and button disabled
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
        ></textarea>
        <div className="buttonContainer">
          <button onClick={onSubmit} id="submitPostButton" disabled>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
