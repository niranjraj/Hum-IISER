import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { category } from "../../../utils/initialValues";
import prisma from "../../../utils/prismaInit";

const activeHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    if (req.method == "POST") {
      const data = req.body;
      if (data.length == 1) {
        const updatedActive = await prisma.order.update({
          where: {
            id: data[0],
          },
          data: {
            active: false,
          },
          include: {
            orderItem: {
              select: {
                name: true,
                quantity: true,
                store: true,
              },
            },
          },
        });
        const { userId, ...newOrder } = updatedActive;

        res.status(200).json(newOrder);
      } else {
        const updatedActive = await prisma.order.updateMany({
          where: {
            id: { in: data },
          },
          data: {
            active: false,
          },
        });
        console.log(updatedActive);

        res.status(200);
      }
    }
  }
};
export default activeHandler;
