import React from 'react';
import Layout from '../components/layout';
import CreateNewPost from '../components/post/CreateNewPost';
import ShowAllPosts from '../components/post/ShowAllPosts';

export default function Home() {
  return (
    <Layout title="Home">
      <CreateNewPost />
      <ShowAllPosts />
    </Layout>
  );
}
