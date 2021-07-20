import React from 'react';
export default function ShowAllPosts() {
  const postedBy = {
    profilePic: '/images/defaultProfilePic.jpg',
    firstName: 'yogesh',
    lastName: 'yadav',
    username: 'yogeshdecodes',
  };
  const postData = { content: 'My first tweet ' };
  const displayName = postedBy.firstName + '' + postedBy.lastName;
  const timestamp = '1 min ago'; //postdata.createdAt

  return (
    <div className="post">
      <div className="mainContentContainer">
        <div className="userImageContainer">
          <img src={postedBy.profilePic} alt="user pic" />
        </div>
        <div className="postContentContainer">
          <div className="postheader">
            <a className="displayName" href={/profile/ + postedBy.username}>
              {displayName}
            </a>
            <span className="username">@{postedBy.username}</span>
            <span className="date">{timestamp}</span>
          </div>
          <div className="postBody">
            <span>{postData.content}</span>
          </div>
          <div className="postFooter">
            <div className="postButtonContainer">
              <button>
                <i className="far fa-comment"></i>
              </button>
            </div>
            <div className="postButtonContainer">
              <button>
                <i className="fas fa-retweet"></i>
              </button>
            </div>
            <div className="postButtonContainer">
              <button>
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
