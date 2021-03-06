import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "@mui/material/Button";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const errors = this.state.errors;

    return (
      <div className="login-container">
        <div style={{ marginTop: "10rem" }} className="row">
          <div className="col s8 offset-s5">
            <Link
              to="/"
              className="btn-flat waves-effect"
              style={{ paddingLeft: "22px" }}
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "22px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Register
                </Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="col s7">
                <div className="input-field col s5">
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", {
                      invalid: errors.username || errors.usernameNotFound,
                    })}
                  />
                  <label htmlFor="username">Username</label>
                  <span className="red-text">
                    {errors.username}
                    {errors.usernameNotFound}
                  </span>
                </div>
              </div>
              <div className="col s7">
                <div className="input-field col s5">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect,
                    })}
                  />
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
              </div>
              <div className="col s7" style={{ paddingLeft: "11.250px" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "140px",
                    height: "50px",
                    marginLeft: "10%",
                    backgroundColor: "orange",
                    color: "#272343",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "orange",
                    },
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
