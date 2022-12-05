import React from 'react';
import trophy from "../Assets/berman_trophy.png";

const Header = (props) => {
  return (
    <header>
      <h1 className="is-center">
        Draft<img src={trophy} style={{height:64, marginBottom: -12, paddingLeft:10, paddingRight:10}} />Board
      </h1>
    </header>
  );
}

export default Header;
