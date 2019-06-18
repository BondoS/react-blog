import React, {Component} from 'react';
import axios from 'axios';
import PostItem from './postItem';

/* eslint-disable */

class AllPosts extends Component {
  constructor (props) {
    super (props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount () {
    axios
      .get ('http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts')
      .then (res => {
        this.setState ({posts: res.data});
      })
      .catch (err => console.log (err));
  }

  render () {
    const {posts} = this.state;
    return (
      <div>
        <ul>
          {posts.map (post => <PostItem key={post.id} post={post} />)}
        </ul>
      </div>
    );
  }
}

export default AllPosts;
