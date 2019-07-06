import React, { Fragment, Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import Comment from "../Comment/Comment";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

// eslint-disable-next-line react/prop-types
/* eslint-disable */
class PostItem extends Component {
  state = {
    comments: [],
    loading: false
  };
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
  submitCommentHandler = event => {
    event.preventDefault();
    const { username, password, history, post } = this.props;
    this.setState(state => {
      return { ...state, loading: true };
    });

    // Send a POST request
    axios({
      method: "post",
      auth: {
        username,
        password
      },
      url: `http://issr-dev.eu-west-1.elasticbeanstalk.com/api/comments`,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        text: event.target.value,
        post: {
          id: post.id
        }
      })
    })
      .then(res => {
        console.log(res.data);
        this.setState(state => {
          return { ...state, loading: false };
        });
        history.push(`/${this.props.match.params.id}`);
      })
      .catch(err => {
        this.setState(state => {
          return { ...state, loading: false };
        });
        console.log(err);
      });
  };

  render() {
    const { post, onPostItemClicked, isSignedState } = this.props;
    const { loading } = this.state;
    const comments = "";
    let addComment = isSignedState ? (
      <form onSubmit={this.submitCommentHandler}>
        <Input type="input" />
        <Button type="submit" btnType="Success">
          Add Comment
        </Button>
      </form>
    ) : (
      ""
    );
    if (loading && isSignedState) {
      addComment = <Spinner />;
    }

    return (
      <Fragment>
        <div className="post-preview">
          <Link to={post.id} onClick={onPostItemClicked.bind(this, post.id)}>
            <h2 className="post-title">
              {post.title
                ? post.title
                : "This is a title placeholder which should be filled with a good title"}
            </h2>
            <h3 className="post-subtitle">{post.text}</h3>
          </Link>
          <p className="post-meta">
            Posted by
            <a href="#"> {post.user.name} </a> <Moment>{post.time}</Moment>
          </p>
          <div>{}</div>
        </div>
        <hr />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    isSignedState: state.loggedIn,
    userId: state.userId,
    username: state.username,
    name: state.name,
    password: state.password
  };
};

PostItem.propTypes = {
  isSignedState: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  history: ReactRouterPropTypes.history
};

PostItem.defaultProps = {
  isSignedState: false,
  username: "",
  password: "",
  history: ReactRouterPropTypes.history
};

export default connect(
  mapStateToProps,
  null
)(PostItem);
