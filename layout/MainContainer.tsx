import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
type Props = {
  children?: ReactNode;
};
const MainContainer = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="main-container">{props.children}</div>
    </>
  );
};

export default MainContainer;
