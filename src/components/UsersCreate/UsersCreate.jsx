import React, { Component } from "react";

export class UsersCreate extends Component {
  state = {
    firstName: "Владимир",
    lastName: "Шадрин",
    email: "shvlad2020@mail.ru",
    password: "4s10v61g",
    repassword: "4s10v61g",
    clientId: "73925d1d81d0a88939c721f814384aa5",
    approved: false,
  };

  handleNameChange = (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleUserCreate = (event) => {
    const user = this.state;
    fetch("http://84.201.129.203:8888/api/auth/sign_in", {
      //fetch("http://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        repassword: user.password2,
        clientId: user.clientId,
        approved: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.json);
      if (!response.ok) {
        alert("Sign-up failed with HTTP code " + response.status);
      } else {
        alert("User creation successful!");
      }
      return response;
    });
  };

  render() {
    const user = this.state;
    return (
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="firstName"
          onChange={this.handleNameChange}
          value={user.firstName}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="lastName"
          onChange={this.handleNameChange}
          value={user.lastName}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="mail@mail.com"
          onChange={this.handleNameChange}
          value={user.email}
        />

        <br />
        <input
          type="password"
          name="password"
          placeholder=""
          onChange={this.handleNameChange}
          value={user.lastName}
        />
        <br />
        <input
          type="text"
          name="clientId"
          placeholder="mail@mail.com"
          onChange={this.handleNameChange}
          value={user.clientId}
        />

        <br />
        <input
          type="button"
          onClick={this.handleUserCreate}
          value="Создать"
          //disabled={!user.email.length}
        />
      </div>
    );
    //<div>Hello from UsersList</div>; User create
  }
}
