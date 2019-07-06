import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Header, Footer } from "./components/layout";
import Allposts from "./components/AllPosts/allPosts";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PostView from "./components/postView/post";
import { logout } from "./store/actions";
import AddPost from "./components/AddPost/AddPost";
import EditPost from "./components/EditPost/EditPost";

class App extends Component {
  constructor() {
    super();
    this.state = {
      postid: ""
    };
  }

  onPostItemClicked = id => {
    console.log(id);
    this.setState({ postid: id });
  };

  /* eslint-disable */

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container-fluid">
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Allposts
                  {...props}
                  onPostItemClicked={this.onPostItemClicked}
                />
              )}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={logout} />
            <Route path="/post/add" component={AddPost} />
            <Route
              path="/post/edit/:id"
              render={props => (
                <EditPost {...props} postID={this.state.postid} />
              )}
            />
            <Route
              path="/:id"
              render={props => (
                <PostView {...props} postID={this.state.postid} />
              )}
            />
            ;
          </Switch>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
