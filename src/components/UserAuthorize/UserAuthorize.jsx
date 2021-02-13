import React, { Component } from "react";

import { Link, Route, Redirect, Switch } from "react-router-dom";
import "./UserAuthorize.css";

export class UserAuthorize extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    redirect: false,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState((prevState) => {
        this.state.redirect = true;
        this.forceUpdate();
      });
    } //check auth
  }
  chkEnter = (e) => {
    const ENTER = 13; //keycode

    if (e.keyCode == ENTER) {
      this.submit();
    }
  };

  submit = () => {
    const state = this.state;
    fetch(`http://84.201.129.203:8888/api/auth/sign_in`, {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(localStorage.getItem("token"));
        if (!data.token) {
          alert("Invalid account!");
          return;
        }
        localStorage.setItem("token", data.token); //save the received token to local storage
        this.setState((prevState) => {
          this.state.redirect = true;
        });
      })
      .then(() => {
        this.forceUpdate();
      });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    console.log("value: ", value);
    const name = event.target.name;
    console.log("name: ", name);

    this.setState({
      [name]: value,
    });
  };

  toggleCheckbox = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;

    if (name == "passwordToggle") {
      const pwdfield = document.getElementById("password");
      if (checked == true) {
        pwdfield.type = "text";
      } else {
        pwdfield.type = "password";
      }
    }
  };

  render() {
    const state = this.state;

    //if (state.redirect === false) {
    return (
      <div class="form-signin text-center">
        <form>
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
          <label for="inputEmail" class="visually-hidden">
            Email address
          </label>
          <input
            class="form-control"
            type="email"
            name="email"
            placeholder="e-mail"
            onKeyDown={this.chkEnter}
            onChange={this.handleInputChange}
            value={state.email}
          ></input>{" "}
          <br />
          <label for="inputPassword" class="visually-hidden">
            Password
          </label>
          <input
            class="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onKeyDown={this.chkEnter}
            onChange={this.handleInputChange}
            value={state.password}
          ></input>
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"></input>Remember me
            </label>
          </div>
          <button
            class="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={this.submit}
            disabled={!state.email.length || !state.password.length}
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
