import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../context/Context";

const Navbar = () => {
  const globalState = useContext(Cartcontext);
  console.log("44", globalState);
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to={"/"}>
            <span className="navbar-brand">Navbar</span>
          </Link>
          <form className="d-flex input-group w-auto">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span className="input-group-text border-0" id="search-addon">
              <BiSearchAlt2 />
            </span>
          </form>
          <div className="me-3 ">
            <Link to="/cart">
              <BsCartFill className="text-info" />
              <span className="text-black">{globalState.state.length}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
