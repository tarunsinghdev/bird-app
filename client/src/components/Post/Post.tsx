import React from 'react';
import { Image } from 'react-bootstrap';
import PostFooter from './PostFooter';

const Post = () => {
  return (
    <div className="border post">
      <div className="post__header-wrapper">
        <Image
          src="/images/user.png"
          roundedCircle
          style={{ width: 50, height: 50 }}
        />
      </div>
      <div className="post__content">
        <span>
          <strong>username</strong>
        </span>
        <p>
          Hey there how are you are you taking care of your health Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Sed odit aliquid
          debitis. Praesentium enim nulla itaque dolor accusamus molestiae,
          impedit, soluta, voluptatem possimus illum quibusdam eveniet officiis
          nostrum odit porro?
        </p>
        <PostFooter />
      </div>
    </div>
  );
};

export default Post;
