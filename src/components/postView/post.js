import React, {Component} from 'react';
import './post.css';
import axios from 'axios';

export default class PostView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      post: {
        user: {},
      },
      postID: this.props.match.params.id,
    };
  }

  componentDidMount () {
    const {postID} = this.state;
    axios
      .get (
        `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${postID}`
      )
      .then (res => {
        this.setState ({post: res.data});
      })
      .catch (err => console.log (err));
  }

  render () {
    const {post} = this.state;
    console.log (post);
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-9">
            <div className="post-content">
              <div className="post-container">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  alt="user"
                  className="rounded pull-left"
                />
                <div className="post-detail">
                  <h5> Alexis Clark</h5>
                  <div className="line-divider" />
                  <div className="post-text">
                    <p>
                      {post.title}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    {post.user.id}
                  </div>
                  <div className="line-divider" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
