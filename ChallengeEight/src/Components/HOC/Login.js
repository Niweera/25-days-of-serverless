import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import Alert from "../Helpers/Alert";
import { firebaseAuth } from "../../Store/Config";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showReset: false,
    message: "",
    messageType: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .then(() => {
        console.log("Successfully logged in");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          showReset: true,
          message: err.message,
          messageType: "error"
        });
      });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  resetPassword = e => {
    e.preventDefault();
    firebaseAuth
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log("Password Reset Email Sent.");
        this.setState({
          message: "Password Reset Email Sent.",
          messageType: "success"
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          showReset: true,
          message: err.message,
          messageType: "error"
        });
      });
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {this.state.message ? (
              <Alert
                message={this.state.message}
                messageType={this.state.messageType}
              />
            ) : null}
            <div
              className="card"
              style={{
                backgroundColor: "#3b3a30",
                textSshadow: "0 1px 3px rgba(0,0,0,.5)",
                color: "white"
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: "#212529",
                  textShadow: "0 1px 3px rgba(0,0,0,.5)",
                  color: "white"
                }}
              >
                <i className="fas fa-lock"></i> Login
              </div>

              <div className="card-body">
                <form>
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      E-Mail Address
                    </label>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Password
                    </label>

                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>

                  {this.state.showReset === true ? (
                    <div className="form-group row mb-0">
                      <div className="col-md-3"></div>
                      <div className="col-md-3">
                        <button
                          onClick={this.onSubmit}
                          type="submit"
                          className="btn btn-dark btn-block"
                        >
                          Login
                        </button>
                      </div>
                      <div className="col-md-3">
                        <button
                          onClick={this.resetPassword}
                          type="submit"
                          className="btn btn-dark btn-block"
                        >
                          Reset Password
                        </button>
                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  ) : (
                    <div className="form-group row mb-0">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <button
                          onClick={this.onSubmit}
                          type="submit"
                          className="btn btn-dark btn-block"
                        >
                          Login
                        </button>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

const mapStateToProps = ({ firebase: { authError } }) => ({
  authError
});

export default compose(
  withRouter,
  withFirebase,
  connect(mapStateToProps)
)(Login);

// export default firebaseConnect()(Login);
