import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";


const Header = () => {
  return (
    // <Menu style={{ marginTop: "10px" }}>
    //   <Link route="/">
    //     <a className="item">PKI Systme</a>
    //   </Link>
    //   <Menu.Menu position="right">
    //     <Link route="/">
    //       <a className="item">Certificates</a>
    //     </Link>

    //     <Link route="/certificates/new">
    //       <a className="item">+</a>
    //     </Link>
    //   </Menu.Menu>
    // </Menu>
  <div class="container">
    <div class="text" style={{
      padding: "20px",
      margin: "20px",
      "font-size":"xx-large",
      "font-weight": "bold",
      "font-style": "italic",
      "text-align": "center",
      "background-color":"#2185d0",
      color: "white",
      "transition-duration": "5s",
      animation: "text-animation 5s",
      "transition-timing-function": "ease-in-out",
      direction: "reverse",
      "border-radius": "15px",
    }}> 
    <Link route="/">
      <a style={{"color": "white"}}> PKI System </a>
    </Link>
    </div>
  </div>
  );
};

export default Header;
