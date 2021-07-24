import React, { useState, useEffect, useRef } from 'react';
import timeDifference from '../../helper/post/timestamp.js';
import { likePost } from '../../helper/post/index';
import { isAuthenticated } from '../../helper/auth/index';

export default function PostCard({ post }) {
  const [likes, setLikes] = useState('');
  const [likeActiveStatus, setLikeActiveStatus] = useState();
  // const node = useRef('');
  const { user, token } = isAuthenticated();

  const displayName = post.postedBy.firstName + ' ' + post.postedBy.lastName;
  const timestamp = timeDifference(new Date(), new Date(post.createdAt));

  const likeHandler = (event) => {
    event.preventDefault();
    // let bt = document.getElementById('likeButton');
    // if (post.likeusers.includes(user._id)) {
    //   bt.classList.remove('active');
    //   setLikes(post.likeusers.length - 1);
    // }

    likePost(post._id, user._id, token).then((data) => {
      setLikes(data.likeusers.length);
      data.likeusers.includes(user._id)
        ? setLikeActiveStatus('active')
        : setLikeActiveStatus('');
    });
  };

  // const handlingRef = () => {
  //   console.log(node);
  //   post.likeusers.includes(user._id)
  //     ? node.current.classList.add('active')
  //     : node.current.classList.remove('active');
  // };

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
                // ref={node}
                id="likeButton"
                onClick={likeHandler}
                className={
                  (post.likeusers.includes(user._id) ? 'active' : '') ||
                  likeActiveStatus
                }
              >
                <i className="far fa-heart"></i>
                <span>{likes || post.likeusers.length || ''}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
