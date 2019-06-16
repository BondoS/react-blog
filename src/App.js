import React from "react";
import { Header, Footer } from "./components/layout";
import AllPosts from "./components/AllPosts/allPosts";

function App() {
  return (
    <div>
      <Header />
      <AllPosts />
      <Footer />
    </div>
  );
}

export default App;
