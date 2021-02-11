import "./UsersList.css";
import React, { Component } from "react";

import { Link } from "react-router-dom";
export class UsersList extends Component {
  state = {
    cases: [],
  };
  componentDidMount() {
    fetch("http://84.201.129.203:8888/api/cases")
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
