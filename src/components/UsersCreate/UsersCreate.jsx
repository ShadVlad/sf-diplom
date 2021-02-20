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

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleUserCreate = (event) => {
    const user = this.state;
    console.log(user);
    fetch("http://84.201.129.203:8888/api/auth/sign_up", {
      //fetch("http://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        repassword: user.repassword,
        clientId: user.clientId,
        approved: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
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
      <div class="form-signin">
        <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
        <input
          class="form-control"
          type="text"
          name="firstName"
          placeholder="firstName"
          onChange={this.handleInputChange}
          value={user.firstName}
        />
        <br />
        <input
          class="form-control"
          type="text"
          name="lastName"
          placeholder="lastName"
          onChange={this.handleInputChange}
          value={user.lastName}
        />
        <br />
        <input
          class="form-control"
          type="text"
          name="email"
          placeholder="mail@mail.com"
          onChange={this.handleInputChange}
          value={user.email}
        />
        <br />
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder=""
          onChange={this.handleInputChange}
          value={user.password}
        />
        <br />
        <input
          class="form-control"
          type="password"
          name="repassword"
          placeholder=""
          onChange={this.handleInputChange}
          value={user.repassword}
        />
        <br />{" "}
        <input
          class="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={this.handleUserCreate}
          value="Создать"
          //disabled={!user.email.length}
        />
      </div>
    );
    //<div>Hello from UsersList</div>; User create
    //<input type="text" name="clientId" placeholder="" onChange={this.handleInputChange} value={user.clientId}  />
  }
}
