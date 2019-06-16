import React from "react";

function PostItem({ post }) {
  return (
    <div>
      {post.text} 
      {' '}
      {post.time}
    </div>
  );
}

export default PostItem;
