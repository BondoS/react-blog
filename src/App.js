import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header, Footer} from './components/layout';
import Allposts from './components/AllPosts/allPosts';
import Register from './components/Register/Register';

function App () {
  return (
    <div className="container">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Allposts} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Register} />
        </Switch>
        {/* <Allposts />
        <Register /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
