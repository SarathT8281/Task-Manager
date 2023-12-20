import React from "react";
import "../Components/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="main">
      <div className="nav">
        <h1>TASK BAR</h1>
        <Link
          style={{ textDecoration: "none", marginTop: "15px" }}
          to={"/home"}
        >
        
          <span> Home</span>
        </Link>
        <Link
          style={{ textDecoration: "none", marginTop: "15px" }}
          to={"/task"}
        >
          <span> Tasks</span>
        </Link>
        <Link style={{ textDecoration: "none", marginTop: "15px" }} to={"/"}>
          {" "}
          <span> LogOut</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
