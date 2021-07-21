import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../helper/post/index.js';
import timeDifference from '../../helper/post/timestamp.js';

export default function ShowAllPosts() {
  const [posts, setPosts] = useState([]);

  const preload = () => {
    getAllPosts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      {posts.map((post, index) => {
        const displayName =
          post.postedBy.firstName + ' ' + post.postedBy.lastName;

        const timestamp = timeDifference(new Date(), new Date(post.createdAt));
        return (
          <div key={index} className="post">
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
      })}
    </div>
  );
}
