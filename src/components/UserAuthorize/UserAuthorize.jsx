import React, { Component } from "react";

import { Link, Route, Redirect, Switch } from "react-router-dom";
import "./UserAuthorize.css";

export class UserAuthorize extends Component {
  state = {
    email: "",
    password: "",
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
    console.log("state.password: ", state.password);
    console.log("state.email,: ", state.email);
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
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(localStorage.getItem("token"));
        if (!data.token) {
          alert("Invalid account!");
          return;
        }
        localStorage.setItem("token", data.token); //save the received token to local storage
        console.log("data.token: ", data.token);
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

    if (state.redirect === false) {
      return (
        <div className="authBody form-signin">
          <h2 className="h3 mb-3 fw-normal">Вход</h2>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="e-mail"
            onKeyDown={this.chkEnter}
            onChange={this.handleInputChange}
            value={state.email}
          />{" "}
          <br />
          <div>
            {" "}
            <label htmlFor="inputPassword" class="visually-hidden">
              Password
            </label>
          </div>{" "}
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onKeyDown={this.chkEnter}
            onChange={this.handleInputChange}
            value={state.password}
          />{" "}
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"></input>Запомнить меня
            </label>
          </div>
          <input
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            id="auth"
            value="Войти"
            onClick={this.submit}
            disabled={!state.email.length || !state.password.length}
          />
          <span>
            Или <Link to="/create">зарегестрироваться</Link>
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <Redirect to="/" />
        </div>
      ); /*this renders a redirect (thus sending you forward after you sign in) after you've been verified*/
    }
  }
}
