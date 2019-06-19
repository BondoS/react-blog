import React, { Fragment } from "react";
import { Header, Footer } from "./components/layout";
import Allposts from "./components/AllPosts/allPosts";

function App() {
  return (
    <Fragment>
      <Header />
      <Allposts />
      <Footer />
    </Fragment>
  );
}

export default App;
