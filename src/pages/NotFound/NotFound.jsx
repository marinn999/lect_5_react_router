import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Sorry, but there is nothing...</h1>

      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
