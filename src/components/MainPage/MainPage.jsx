import React, { Component } from "react";
import "./MainPage.css";

import { Link, Redirect } from "react-router-dom";

export class MainPage extends Component {
  state = {
    authorized: false,
    init: false,
    shouldRedirect: true,
  };

  signOut(self) {
    localStorage.removeItem("token");
    this.setState((prevState) => {
      this.state.authorized = false;
    });
    this.state.init = true;
    this.forceUpdate();
  }
  componentDidMount() {
    //check initial auth status; default is false, so we set it to true if we're authorized
    if (localStorage.getItem("token")) {
      //if we have a token stored, we're authorized
      this.setState(() => {
        this.state.authorized = true;
      });
    }
    this.state.init = true;
    console.log("this.state.authorized: ", this.state.authorized);
    this.forceUpdate();
  }

  static getDerivedStateFromProps(props, state) {
    //called whenever we navigate to a new URL location, pre-render
    let loggedIn = state.authorized;
    let throwToAuth = true;
    console.info(`%c//////`, "color: orange");
    console.info(
      `%cNavbar detected navigation towards ${props.currentPage}`,
      "color: orange"
    );
    if (localStorage.getItem("token") && true == !state.authorized) {
      //this is called whenever we log in or log out (auth status changes)
      //in that case, we need to update status
      loggedIn = (localStorage.getItem("token") && true) || false;
      console.info(
        `%cDetected transition of login status, accepting token: ${
          localStorage.getItem("token") || "clearing"
        }`,
        "color: gold"
      );
      //this records the token as a boolean into auth state
    }

    console.info(
      `%cNOW LOGGED IN (pre-redirect check): ${loggedIn}`,
      "color: orange"
    );
    if (!loggedIn) {
      //if unauthorized, check current page to see if you should be thrown out
      //to prevent the redirect, add a case here
      //by default, any page not listed here will throw you to /auth if accessed without a token

      console.info(
        `%cTesting whether page ${props.currentPage} should throw to auth`,
        "color: orange"
      );

      switch (props.currentPage) {
        case "/":
        case "/report":
        case "/create":
        case "/auth": //this one's particularly important, obviously
          throwToAuth = false;
          console.info(`%cIt shouldn't`, "color: green");
          break;
        default:
          throwToAuth = true;
          console.info(`%cIt should`, "color: gold");
          break;
      }
    }
    console.info(`%c//////`, "color: orange");

    return {
      authorized: loggedIn,
      init: true,
      shouldRedirect: throwToAuth,
    };
  }
  render() {
    const self = this;
    const state = this.state;

    let auth = (state.authorized && (
      <button
        type="button"
        className="btn btn-primary"
        onClick={function () {
          return self.signOut(this);
        }}
      >
        Sign out
      </button>
    )) ||
      (state.shouldRedirect && <Redirect to="/" />) || (
        <Link to="/auth">Log in</Link>
      );
    //this looks complicated; it's a pseudo case-switch
    //if you're logged in, it's a sign out button
    //if you're not, and you're on a restricted page, it's a redirect element to the auth page
    //if you're not logged in, but login isn't required, it's a log in link

    return (
      <div>
        <div className="navbar-my">
          <header className="container container-nav header px-4 px-md-0">
            <div className="row row-logo justify-content-between align-items-center">
              <div className="col-lg-2 col-6 brand">
                <Link to="/" className="title">
                  BikeSecure
                </Link>{" "}
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <nav>
                  <ul className="navigation d-flex justify-content-between">
                    <li className="navigation-item">
                      <Link to="/report" className="links">
                        Report a case
                      </Link>
                    </li>
                    <li
                      className={
                        !state.authorized
                          ? "hide navigation-item"
                          : "navigation-item"
                      }
                    >
                      <Link to="/cases" className="links">
                        Cases
                      </Link>
                    </li>
                    <li
                      className={
                        !state.authorized
                          ? "hide navigation-item"
                          : "navigation-item"
                      }
                    >
                      <Link to="/collaborators" className="links">
                        Collaborators
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-3">{auth}</div>
            </div>
          </header>
        </div>
        <div className="main-body navbar-light"></div>
      </div>
    );
  }
}

// <div class="container navbar-brand">
//       <Link to="/" className="title">
//         BikeSecure
//       </Link>
//     </div>

//     <div>
// <Link to="/report" className={state.authorized ? "hide" : undefined}>
//  Report a case //{" "} */}
// </Link>;
//       <Link
//         to="/cases"
//         className={!state.authorized ? "hide" : undefined}
//       >
//         Cases
//       </Link>
//       <Link
//         to="/collaborators"
//         className={!state.authorized ? "hide" : undefined}
//       >
//         Collaborators
//       </Link>
//     </div>
