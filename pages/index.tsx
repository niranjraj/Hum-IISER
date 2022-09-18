import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Greeter from "../components/Greeter";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Greeter />
    </>
  );
};

export default Home;
