import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { getPostById } from '../../helper/post/index.js';

export default function ShowReplies({ postId }) {
  const [post, setPost] = useState();

  const preload = () => {
    getPostById(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      {/* if main post itself is reply to someone else */}
      {post && post.replyTo !== undefined && post.replyTo._id !== undefined && (
        <PostCard post={post.replyTo}></PostCard>
      )}
      {/* main post */}
      {post && <PostCard post={post.postData} largeFont={true}></PostCard>}
      {/* replies */}
      {post &&
        post.replies &&
        post.replies.map((post, index) => {
          return <PostCard key={index} post={post}></PostCard>;
        })}
    </div>
  );
}
