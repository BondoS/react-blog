import React from "react";
import { Header, Footer } from "./components/layout";
import Allposts from "./components/AllPosts/allPosts";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="container">
        <Allposts />
      </div>
      <Footer />
    </div>
  );
}

export default App;
