import type { NextPage, GetServerSidePropsContext } from "next";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { CgArrowLeft } from "react-icons/cg";
const Home: NextPage = () => {
  return (
    <div className="login-container">
      <div className="login-content-wrapper">
        <div className="login-content">
          <h2>Log in</h2>
          <p>Welcome back! Please sign in to continue</p>
          <div className="login-btn-wrapper">
            <button
              className="google-btn"
              onClick={() => signIn("google", { callbackUrl: "/account" })}
            >
              <FcGoogle /> <p>Sign in with Google</p>
            </button>
            <Link href="/">
              <a className="login-back-btn">
                <CgArrowLeft />
                Back
              </a>
            </Link>
          </div>
        </div>
        <div className="login-img-wrapper"></div>
      </div>
    </div>
  );
};

export default Home;
