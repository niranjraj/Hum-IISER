import type { NextPage, GetServerSidePropsContext } from "next";
import { getProviders, signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div className="login-container">
      <div className="login-content-wrapper">
        <h2>Sign In to HUM?</h2>

        <button
          className="google-btn"
          onClick={() => signIn("google", { callbackUrl: "/account" })}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
