import React from "react";
import {
  withRouter,
  Link,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import isLogedIn from "../../../helpers/isLogedIn";
import "./login.css";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      login: false,
      store: "",
    };
  }

  componentDidMount() {
    if (isLogedIn()) {
      this.props.history.push("/");
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("/users/signin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.token) {
          localStorage.setItem("token", json.token);
          this.setState({ login: true });
          this.props.history.push("/");
        }
      })
      .catch((err) => this.props.history.push("/"));
  };

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)} id="loginForm">
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

          <button type="submit" className="loginForm__btn">
            Login
          </button>
        </form>

        <Link to="/register">Create account</Link>
      </div>
    );
  }
}
export default withRouter(Login);
