import React from 'react';

function Header(props) {
  return(
    <header>
      <div className="header-logo" onClick={() => props.clearBusinesses()}><h1>YelChat</h1></div>
      <div className="header-primary"></div>
    </header>
  );
}

export default Header;