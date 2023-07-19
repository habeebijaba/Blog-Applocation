import React from "react";
import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link className="link" to="/">
        <img
          style={{
            width: "150px",
            height: "65px",
          }}
          src={Logo}
          alt=""
        />
      </Link>
      <span>Copyright © 2023 B TALK. All rights reserved.</span>
    </div>
  );
};

export default Footer;
