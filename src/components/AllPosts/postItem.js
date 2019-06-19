import React, { Fragment } from "react";
import Moment from "react-moment";

// eslint-disable-next-line react/prop-types
function PostItem({ post }) {
  return (
    <Fragment>
      <div className="post-preview">
        <a href="#">
          <h2 className="post-title">
            {post.title
              ? post.title
              : "This is a title placeholder which should be filled with a good title"}
          </h2>
          <h3 className="post-subtitle">{post.text}</h3>
        </a>
        <p className="post-meta">
          Posted by
          <a href="#"> 
            {' '}
            {post.user.name}
            {' '}
          </a> 
          {' '}
          <Moment>{post.time}</Moment>
        </p>
      </div>
      <hr />
    </Fragment>
  );
}

export default PostItem;
