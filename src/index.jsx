import React, { Component } from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UsersList } from "./components/UsersList";
import { UsersCreate } from "./components/UsersCreate";
export class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={UsersList} exact={true} />
          <Route path="/create" component={UsersCreate} exact={true} />
        </Switch>
      </div>
    );
  }
  //<UsersList />
}

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
