import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Header, Footer } from "./components/layout";
import Allposts from "./components/AllPosts/allPosts";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PostView from "./components/postView/post";

class App extends Component {
  constructor() {
    super();
    this.state = {
      postid: ""
    };
  }

  onPostItemClicked = id => {
    this.setState({ postid: id });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container-fluid">
          <Switch>
            <Route
              path="/"
              exact
              component={Allposts}
              onPostItemClicked={this.onPostItemClicked}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              path="/:post"
              component={PostView}
              postID={this.state.postid}
            />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
