import React, { Component } from "react";
import axios from "axios";

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts?ID=${this.props.postID}`
      )
      .then(res => {
        this.setState({ post: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return <div>{this.state.post.text}</div>;
  }
}
