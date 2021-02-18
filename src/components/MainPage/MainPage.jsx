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
  render() {
    const self = this;
    const state = this.state;

    let auth = (state.authorized && (
      <button
        type="button"
        class="btn btn-primary"
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
        <div class="navbar-my">
          <header class="container container-nav header px-4 px-md-0">
            <div class="row row-logo justify-content-between align-items-center">
              <div class="col-lg-2 col-6 brand">
                <Link to="/" className="title">
                  BikeSecure
                </Link>{" "}
              </div>
              <div class="col-lg-6 d-none d-lg-block">
                <nav>
                  <ul class="navigation d-flex justify-content-between">
                    <li class="navigation-item">
                      <Link
                        to="/report"
                        className={state.authorized ? "hide links" : "links"}
                      >
                        Report a case
                      </Link>
                    </li>
                    <li class="navigation-item">
                      <Link
                        to="/cases"
                        className={!state.authorized ? "hide" : "links"}
                      >
                        Cases
                      </Link>
                    </li>
                    <li class="navigation-item">
                      <Link
                        to="/collaborators"
                        className={!state.authorized ? "hide" : "links"}
                      >
                        Collaborators
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-3">{auth}</div>
            </div>
          </header>
        </div>
        <div class="main-body navbar-light"></div>
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
