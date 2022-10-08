import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const activeHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    console.log("here");
  }
};
export default activeHandler;
