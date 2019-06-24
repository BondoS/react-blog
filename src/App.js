import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header, Footer} from './components/layout';
import Allposts from './components/AllPosts/allPosts';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AddPost from './components/AddPost/AddPost';
import Logout from './components/Logout/Logout';

function App () {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Allposts} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/post/add" component={AddPost} />
        </Switch>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
