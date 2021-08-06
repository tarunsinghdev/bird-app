import React, { useState, forwardRef } from 'react';
import timeDifference from '../../helper/post/timestamp.js';
import {
  deletePost,
  likePost,
  retweetPost,
  createPost,
} from '../../helper/post/index';
import { isAuthenticated } from '../../helper/auth/index';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function PostCard({ post, largeFont = false }) {
  const [data, setData] = useState(post);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [content, setContent] = useState('');

  const { user, token } = isAuthenticated();
  const history = useHistory();

  let largeFontClass = largeFont ? 'largeFont' : '';

  const isRetweet = post?.retweetData !== undefined;
  const retweetedBy = isRetweet ? post.postedBy.username : null;
  post = isRetweet ? post.retweetData : post;

  const isReply = post?.replyTo !== undefined;
  const replyToUsername = post?.replyTo?.postedBy?.username;

  const displayName =
    post?.postedBy?.firstName + ' ' + post?.postedBy?.lastName;
  const timestamp = timeDifference(new Date(), new Date(post?.createdAt));

  const likeHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();

    likePost(post._id, user._id, token).then((data) => {
      setData(data);
    });
  };

  const retweetHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();

    retweetPost(post._id, user._id, token).then((data) => {
      setData(data);
    });
  };

  const handleClose = () => {
    setShow(false);
    setContent('');
  };

  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleDeleteClose = (event) => {
    // event.stopPropagation();
    setDeleteShow(false);
  };

  const handleDeleteShow = (event) => {
    event.stopPropagation();
    setDeleteShow(true);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const data = {
      content: content,
      replyTo: post._id,
    };

    createPost(user._id, token, data).then((data) => {
      if (data.error) {
        toast.error('This is an error');
      } else {
        setContent('');
        handleClose();
        window.location.reload();
      }
    });
  };

  const deleteHandle = (event) => {
    event.stopPropagation();
    deletePost(post._id, user._id, token)
      .then((status) => {
        if (status != 202) alert('Could not delete post');
        handleDeleteClose();
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const replyModal = () => {
    return (
      <Modal
        id="replyModal"
        className="modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* replied post */}
          <div className="mainContentContainer">
            <div className="userImageContainer">
              <img src={post?.postedBy.profilePic} alt="user pic" />
            </div>
            <div className="postContentContainer">
              <div className="postheader">
                <a
                  className="displayName"
                  href={/profile/ + post?.postedBy.username}
                >
                  {displayName}
                </a>
                <span className="username">@{post?.postedBy.username}</span>
                <span className="date">{timestamp}</span>
              </div>
              <div className="postBody">
                <span>{post?.content}</span>
              </div>
            </div>
          </div>
          {/* reply mid styling */}
          <div className="replyContainer">
            <div className="replyVerticalLineContainer">
              <div className="replyVerticalLine"></div>
            </div>
            <div className="replyHeader">
              Replying to <span>@{post?.postedBy.username}</span>
            </div>
          </div>
          {/* create reply body */}
          <div className="postFormContainer">
            <div className="userImageContainer">
              <img
                src="/images/defaultProfilePic.jpg"
                alt="User's Profile Pic"
              />
            </div>
            <div className="textareaContainer">
              <textarea
                value={content}
                placeholder="Tweet your reply"
                id="postTextArea"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            id="submitReplyButton"
            disabled={content === '' ? true : false}
            variant="primary"
            onClick={onSubmit}
          >
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const deleteModal = () => {
    return (
      <Modal
        id="deleteModal"
        className="modal"
        show={deleteShow}
        onHide={handleDeleteClose}
        centered
        size="sm"
      >
        <Modal.Body className="deleteModalBody">
          <div className="deleteModalHead">
            <span>Delete Tweet ?</span>
          </div>
          <div className="deleteModalText">
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from Twitter search
            results.
          </div>
        </Modal.Body>
        <Modal.Footer className="deleteModalFooter">
          <Button
            id="cancelDeleteButton"
            variant="secondary"
            onClick={handleDeleteClose}
          >
            Cancel
          </Button>
          <Button
            id="deleteTweetButton"
            variant="primary"
            onClick={deleteHandle}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const redirectPostpage = () => {
    history.push(`/post/${post._id}`);
  };

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
    >
      <i className="fas fa-ellipsis-h"></i> {children}
    </button>
  ));

  return (
    <>
      {show && replyModal()}
      {deleteShow && deleteModal()}
      <div onClick={redirectPostpage} className={`${largeFontClass} post`}>
        {isRetweet ? (
          <div className="retweetContainer">
            <span>
              <i className="fas fa-retweet"> </i>
              &nbsp; Retweeted by{' '}
              <a href={/profile/ + retweetedBy}>@{retweetedBy}</a>
            </span>
          </div>
        ) : (
          ''
        )}

        <div className="mainContentContainer">
          <div className="userImageContainer">
            <img src={post?.postedBy.profilePic} alt="user pic" />
          </div>
          <div className="postContentContainer">
            <div className="postheader">
              <a
                className="displayName"
                href={/profile/ + post?.postedBy.username}
              >
                {displayName}
              </a>
              <span className="username">@{post?.postedBy.username}</span>
              <span className="date">{timestamp}</span>

              {post.postedBy._id === user._id && (
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>

                  <Dropdown.Menu className="dropdownItem">
                    <Dropdown.Item
                      style={{ color: '#e0245e' }}
                      onClick={handleDeleteShow}
                    >
                      <i className="far fa-trash-alt"></i> &nbsp;Delete
                    </Dropdown.Item>
                    <Dropdown.Item href="/action-2">
                      <i className="fas fa-thumbtack"></i> &nbsp;Pin to your
                      Profile
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            {isReply ? (
              <div className="replyFlag">
                Replying to{' '}
                <a href={/profile/ + replyToUsername}>@{replyToUsername}</a>
              </div>
            ) : (
              ''
            )}
            <div className="postBody">
              <span>{post?.content}</span>
            </div>
            <div className="postFooter">
              <div className="postButtonContainer">
                <button onClick={handleShow}>
                  <i className="far fa-comment"></i>
                </button>
              </div>
              <div className="postButtonContainer green">
                <button
                  onClick={retweetHandler}
                  className={
                    data?.retweetUsers?.includes(user._id) ? 'active' : ''
                  }
                >
                  <i className="fas fa-retweet"></i>
                  <span>{data?.retweetUsers?.length || ''}</span>
                </button>
              </div>
              <div className="postButtonContainer red">
                <button
                  onClick={likeHandler}
                  className={
                    data?.likeusers?.includes(user._id) ? 'active' : ''
                  }
                >
                  <i className="far fa-heart"></i>
                  <span>{data?.likeusers?.length || ''}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
