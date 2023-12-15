import React from "react";
import "./Style.css";
import Notes from "./Notes";
import Addnote from "./Addnote";

function Home() {
  return (
    <div className="home-container">
      <Addnote />
      <Notes />
    </div>
  );
}

export default Home;
