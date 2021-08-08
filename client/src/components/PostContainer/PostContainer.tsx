import React from 'react';
import ContainerHeader from '../ContainerHeader/ContainerHeader';
import Post from '../Post/Post';
import TweetBox from './TweetBox/TweetBox';

const PostContainer = () => {
  return (
    <>
      <ContainerHeader />
      <TweetBox />
      <Post />
    </>
  );
};

export default PostContainer;
