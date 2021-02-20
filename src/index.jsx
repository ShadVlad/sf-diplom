import React, { Component } from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Context } from "./components/Context";
import { UsersCreate } from "./components/UsersCreate";
import { UserAuthorize } from "./components/UserAuthorize";
import { MainPage } from "./components/MainPage";
export class App extends Component {
  render() {
    return (
      <div>
        <MainPage />
        <Switch>
          <Route path="/" component={Context} exact={true} />
          <Route path="/create" component={UsersCreate} exact={true} />
          <Route path="/auth" component={UserAuthorize} exact={true} />
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
