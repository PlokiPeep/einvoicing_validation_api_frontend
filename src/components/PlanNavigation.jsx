import React from "react";
import Button from '@mui/material/Button';

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            ChurroFlow
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/plans" className="page-scroll">
                Plans
              </a>
            </li>
            <Button href="/register" variant="contained" sx={{ my: 1.9, mx: 1.5 }}>
              SIGN UP
            </Button>
            <Button href="/login" variant="contained" sx={{ my: 1.9, mx: 1.5 }}>
              LOG ON
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};