import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header, Footer} from './components/layout';
import Allposts from './components/AllPosts/allPosts';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App () {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Allposts} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
