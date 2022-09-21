import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import MainContainer from "../layout/MainContainer";

const Account: NextPage = () => {
  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <MainContainer>
        <div className="account-container"></div>
      </MainContainer>
    );
  }
  return <div></div>;
};

export default Account;
