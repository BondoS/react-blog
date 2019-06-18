import React from "react";
import Moment from "react-moment";

// eslint-disable-next-line react/prop-types
function PostItem({ post }) {
  return (
    <div className="card mb-4 mt-4">
      <img
        className="card-img-top"
        src={post.imageUrl}
        alt="post"
        width="750"
        height="300"
      />
      <div className="card-body">
        <h2 className="card-text">{post.text}</h2>
        <a href="#" className="btn btn-primary">
          Read More &rarr;
        </a>
      </div>
      <div className="card-footer text-muted">
        Posted 
        {' '}
        <Moment parse="YYYY-MM-DD HH:mm">{post.time}</Moment>
        {" by "}
        <a href="#">{post.user.name}</a>
      </div>
    </div>
  );
}

export default PostItem;
