import React, { Component } from 'react'

class allcomments extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    const { post } = this.props;
    axios
      .get(
        `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${post.id}/comments`
      )
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(err => console.log(err));
  }

  
  render() {
    return()
  }
  
}
