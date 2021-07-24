import React, { useState } from 'react';
import timeDifference from '../../helper/post/timestamp.js';
import { likePost } from '../../helper/post/index';
import { isAuthenticated } from '../../helper/auth/index';

export default function PostCard({ post }) {
  const [likes, setLikes] = useState('');
  const [likeActiveStatus, setLikeActiveStatus] = useState('');
  const [data, setData] = useState(post);
  const { user, token } = isAuthenticated();

  const displayName = post.postedBy.firstName + ' ' + post.postedBy.lastName;
  const timestamp = timeDifference(new Date(), new Date(post.createdAt));

  const likeHandler = (event) => {
    event.preventDefault();

    likePost(post._id, user._id, token).then((data) => {
      console.log(data);
      setData(data);
      setLikes(data.likeusers.length);
      data.likeusers.includes(user._id)
        ? setLikeActiveStatus('active')
        : setLikeActiveStatus('');
    });
  };

  return (
    <div className="post">
      <div className="mainContentContainer">
        <div className="userImageContainer">
          <img src={post.postedBy.profilePic} alt="user pic" />
        </div>
        <div className="postContentContainer">
          <div className="postheader">
            <a
              className="displayName"
              href={/profile/ + post.postedBy.username}
            >
              {displayName}
            </a>
            <span className="username">@{post.postedBy.username}</span>
            <span className="date">{timestamp}</span>
          </div>
          <div className="postBody">
            <span>{post.content}</span>
          </div>
          <div className="postFooter">
            <div className="postButtonContainer">
              <button>
                <i className="far fa-comment"></i>
              </button>
            </div>
            <div className="postButtonContainer green">
              <button className="retweet ">
                <i className="fas fa-retweet"></i>
              </button>
            </div>
            <div className="postButtonContainer red">
              <button
                id="likeButton"
                onClick={likeHandler}
                className={
                  (data.likeusers.includes(user._id) ? 'active' : '') ||
                  likeActiveStatus
                }
              >
                <i className="far fa-heart"></i>
                <span>{likes || data.likeusers.length || ''}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
