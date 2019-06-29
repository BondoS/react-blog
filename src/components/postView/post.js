import React, { Component, Fragment } from "react";
import "./post.css";
import axios from "axios";

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        user: {}
      },
      postID: this.props.match.params.id
    };
  }

  componentDidMount() {
    const { postID } = this.state;
    axios
      .get(`http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${postID}`)
      .then(res => {
        this.setState({ post: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { post } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    const controlButtons =
      typeof user !== "undefined" && user ? (
        <Fragment>
          <button type="button" className="btn btn-warning btn-sm">
            Edit post
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            Delete Post
          </button>
        </Fragment>
      ) : null;

    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-9">
            <div className="post-content">
              <div className="post-container">
                <img
                  src={post.user.imageUrl}
                  alt="user"
                  className="rounded pull-left"
                  width="215"
                  height="215"
                />
                <h4 className="offset-md-1">{post.user.name}</h4>
                <div className="post-detail">
                  <div className="line-divider" />
                  <div className="post-text">
                    <p>{post.title}</p>
                  </div>
                  <div className="line-divider" />
                  <div className="row">{controlButtons}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
