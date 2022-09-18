import React from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="nav-logo">
          <Image src="/static/humlogo.png" height="47" width="100" alt="Hum" />
        </div>
        <ul className="nav-item-wrapper">
          <li>
            <Link href="https://humservices.in/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="https://humservices.in/about-us/">
              <a>About</a>
            </Link>
          </li>
          <li className="service-item">
            <Link href="#">
              <a>
                Services{" "}
                <svg
                  className="ast-arrow-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="0px"
                  y="0px"
                  width="10px"
                  height="10px"
                  viewBox="57 35.171 26 16.043"
                  enableBackground="new 57 35.171 26 16.043"
                >
                  <path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z"></path>
                </svg>
              </a>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link href="#">Home Services</Link>
              </li>
              <li>
                <Link href="#">Delivery Services</Link>
              </li>
              <li>
                <Link href="#">Deep Cleaning</Link>
              </li>
              <li>
                <Link href="#">Life Art</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
        <div className="nav-login">
          <Link href="#">
            <a className="login-button">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
