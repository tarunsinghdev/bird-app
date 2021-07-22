import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { getAllPosts } from '../../helper/post/index.js';

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
        return <PostCard post={post}></PostCard>;
      })}
    </div>
  );
}
