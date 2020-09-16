import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import isLogedIn from "../../../helpers/isLogedIn";

import "./register.css";
const PORT = process.env.PORT || 8080;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullname: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/${PORT}/users/signup`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.status === 201) {
          this.props.history.push("./login");
        }

        return res.json();
      })
      .then((res) => console.log(res));
  };

  render() {
    if (isLogedIn()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="register">
        <h2>Create Account</h2>

        <form onSubmit={(e) => this.handleSubmit(e)} id="registerForm">
          <input
            name="username"
            placeholder="Username"
            value={this.state.firstname}
            required
            onChange={(e) => this.handleChange(e)}
          />
          <input
            name="fullname"
            placeholder="Full name"
            value={this.state.fullname}
            required
            onChange={(e) => this.handleChange(e)}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            required
            onChange={(e) => this.handleChange(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            required
            onChange={(e) => this.handleChange(e)}
          />
          <input
            name="address"
            placeholder="Address"
            value={this.state.address}
            required
            onChange={(e) => this.handleChange(e)}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={this.state.phone}
            required
            onChange={(e) => this.handleChange(e)}
          />
          <button className="registerForm__btn" type="submit">
            Register
          </button>
        </form>

        <Link to="/login">Login</Link>
      </div>
    );
  }
}
export default withRouter(Register);
