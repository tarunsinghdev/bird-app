import React from 'react';
import Layout from '../components/layout';
import CreateNewPost from '../components/post/CreateNewPost';

export default function Home() {
  return (
    <Layout title="Home">
      <CreateNewPost />
    </Layout>
  );
}
