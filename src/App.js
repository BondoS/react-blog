import React from "react";
import { Header, Footer } from "./components/layout";
import Allposts from "./components/AllPosts/allPosts";
import Register from './components/Register/Register';

function App() {
  return (
    <div className="container">
      <Header />
      <div className="container">
        <Allposts />
        <Register />
      </div>
      <Footer />
    </div>
  );
}

export default App;
