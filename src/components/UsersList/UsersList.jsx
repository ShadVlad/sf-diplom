import "./UsersList.css";
import React, { Component } from "react";

import { Link } from "react-router-dom";
export class UsersList extends Component {
  state = {
    cases: [],
  };
  componentDidMount() {
    console.log(localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      this.setState((prevState) => {
        this.state.authFlag = true;
      });
      this.render();
      return;
    } //redirect to main
    fetch("http://84.201.129.203:8888/api/cases", {
      headers: {
        Authorization: "Bearer ".concat(
          localStorage.getItem("token").toString()
        ),
      },
    })
      //fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((cases) => {
        this.setState({ cases });
      });
  }
  render() {
    console.log(this.state);
    const { cases } = this.state;
    return (
      <div class="UsersList">
        <Link to="/create">Создать пользователя</Link>
        <br />
        <Link to="/auth">Войти</Link>
      </div>
      //   <div class="UsersList">
      //     <Link to="/create">Создать пользователя</Link>
      //     <ul>
      //       {users.map((user) => (
      //         <li key={user.clientId}>{user.ownerFullName}</li>
      //       ))}
      //     </ul>
      //   </div>
    );
    //<div>Hello from UsersList</div>;
  }
}
