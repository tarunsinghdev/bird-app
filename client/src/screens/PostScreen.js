import React from 'react';
import Layout from '../components/layout';
import { useParams } from 'react-router-dom';
import ShowReplies from '../components/post/ShowReplies';

export default function PostScreen() {
  let { postId } = useParams();

  return (
    <Layout title="Tweet">
      <ShowReplies postId={postId} />
    </Layout>
  );
}
