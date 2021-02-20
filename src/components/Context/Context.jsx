import React, { Component } from "react";
import "./Context.css";
import image from "../../img/img.jpg";
export class Context extends Component {
  render() {
    return (
      <div className="mainBody">
        <h2>Поиск украденных велосипедов.</h2>
        <img src={image} alt="logo" className="brand-logo" />
      </div>
    );
  }
}
