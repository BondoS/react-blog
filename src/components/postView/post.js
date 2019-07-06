import React, {Component, Fragment} from 'react';
import './post.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import {NavLink} from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import Comment from '../Comment/Comment';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

/* eslint-disable */

class PostView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      post: {
        user: {},
      },
      postID: this.props.match.params.id,
      loading: false,
      comments: [],
    };
  }

  componentDidMount () {
    const {postID} = this.state;

    axios
      .all ([
        axios.get (
          `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${postID}`
        ),
        axios.get (
          `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${postID}/comments`
        ),
      ])
      .then (
        axios.spread ((res1, res2) => {
          this.setState ({post: res1.data, comments: res2.data});
        })
      );
  }

  deletePost = () => {
    const {username, password, history} = this.props;
    const {postID} = this.state;
    const result = confirm ('Want to delete?');
    if (result) {
      this.setState (state => {
        return {...state, loading: true};
      });

      axios ({
        method: 'delete',
        auth: {
          username,
          password,
        },
        url: `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/posts/${postID}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then (res => {
          console.log (res.data);
          this.setState (state => {
            return {...state, loading: false};
          });
          history.push ('/');
        })
        .catch (err => {
          this.setState (state => {
            return {...state, loading: false};
          });
          console.log (err);
        });
    }
  };

  render () {
    const {isSignedState} = this.props;

    let addComment = isSignedState
      ? <form onSubmit={this.submitCommentHandler}>
          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-9">
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Add Comment</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Write your comment here"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </form>
      : '';
    const {post, postID, loading} = this.state;
    const user = JSON.parse (localStorage.getItem ('user'));
    const controlButtons = typeof user !== 'undefined' &&
      user.id === post.user.id
      ? <Fragment>
          <NavLink
            to={'/post/edit/' + postID}
            className="btn btn-warning btn-sm"
          >
            Edit post
          </NavLink>
          <button
            type="button"
            onClick={this.deletePost}
            className="btn btn-danger btn-sm"
          >
            Delete Post
          </button>
        </Fragment>
      : null;
    const content = loading
      ? <Spinner />
      : <div className="container">
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
                    <div className="line-divider" />
                    <div className="post-text">
                      <p>{post.title}</p>
                    </div>
                    <div className="post-text">
                      <p>{post.text}</p>
                    </div>
                    <div className="row">{controlButtons}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div>{addComment}</div>
            {this.state.comments.map (item => (
              <Comment key={item.id} item={item} />
            ))}
          </div>
        </div>;
    return content;
  }
}

const mapStateToProps = state => {
  return {
    isSignedState: state.loggedIn,
    userId: state.userId,
    username: state.username,
    name: state.name,
    password: state.password,
  };
};

PostView.propTypes = {
  isSignedState: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  history: ReactRouterPropTypes.history,
};

PostView.defaultProps = {
  isSignedState: false,
  username: '',
  password: '',
  history: ReactRouterPropTypes.history,
};

export default connect (mapStateToProps, null) (PostView);
