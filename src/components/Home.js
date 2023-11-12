import React from "react";
import { Link } from "react-router-dom";
import Signout from "./Signout";

function Home({ name, isAuthenticated }) {
  return (
    <div>
      {isAuthenticated && (
        <div>
          <h2>Welcome - {name}</h2>
          <br />
          <br />
          <Signout />
        </div>
      )}
    </div>
  );
}

export default Home;