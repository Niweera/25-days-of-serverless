import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";

class Header extends Component {
  state = {
    isAuthenticated: false
  };

  onClickLogout = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <nav className="navbar navbar-expand-md navbar-dark" style={navbarStyle}>
        <div className="container">
          <Link style={headerStyle} className="navbar-brand" to="/">
            NorthPole inc.
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link style={headingStyle} className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    style={loginStyle}
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.auth.email}
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{ backgroundColor: "#3b3a30", color: "white" }}
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      className="dropdown-item "
                      style={{ fontSize: "20px", color: "white" }}
                      href="#!"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </a>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link style={headingStyle} className="nav-link" to="/signin">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const navbarStyle = {
  backgroundColor: "#3b3a30",
  textShadow: "0 1px 3px rgba(0,0,0,.5)",
  color: "white"
};

const loginStyle = {
  backgroundColor: "#3b3a30",
  textShadow: "0 1px 3px rgba(0,0,0,.5)",
  color: "white",
  cursor: "pointer",
  border: "none",
  fontSize: "20px"
};

const headingStyle = {
  fontSize: "20px"
};

const headerStyle = {
  fontSize: "24px"
};

Header.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Header);
