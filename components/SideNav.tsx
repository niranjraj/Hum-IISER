import { useSession, signOut } from "next-auth/react";

import profilePic from "../public/static/default.jpg";
import React from "react";
import Link from "next/link";

const SideNav = () => {
  const { data: session, status } = useSession();
  return (
    <div className="side-nav-wrapper">
      <div className="side-nav-header">
        <div className="side-nav-img">
          {session?.user?.image ? (
            <div
              style={{
                backgroundImage: `url(${session?.user?.image})`,
              }}
              className="side-nav-profile"
            ></div>
          ) : (
            <div
              style={{
                backgroundImage: `url(${profilePic})`,
              }}
              className="side-nav-profile"
            ></div>
          )}
        </div>
      </div>
      <div className="side-nav-item-wrapper">
        <ul className="side-nav-items">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <button className="side-nav-logout" onClick={() => signOut()}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
