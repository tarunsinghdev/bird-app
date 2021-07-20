import React from 'react';

export default function CreateNewPost() {
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
    //TODO : implement logic
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
