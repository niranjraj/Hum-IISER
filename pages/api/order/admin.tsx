import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { category } from "../../../utils/initialValues";
import prisma from "../../../utils/prismaInit";

const adminHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    if (req.method == "POST") {
      const data = req.body;

      const activeOrder = await prisma.order.findMany({
        where: {
          ...(data.dateRange[0] !== null && data.dateRange[1] !== null
            ? {
                createdAt: {
                  gte: data.dateRange[0],
                  lte: data.dateRange[1],
                },
              }
            : {}),

          ...(data.category === "" ? {} : { category: data.category }),
        },
        ...(!data.dateRange[0] && !data.dateRange[1]
          ? {
              orderBy: {
                createdAt: "desc",
              },
            }
          : {}),

        include: {
          orderItem: {
            select: {
              name: true,
              quantity: true,

              unit: true,
            },
          },
        },
      });
      const activeOrderCount = await prisma.order.aggregate({
        where: {
          ...(data.dateRange[0] !== null && data.dateRange[1] !== null
            ? {
                createdAt: {
                  gte: data.dateRange[0],
                  lte: data.dateRange[1],
                },
              }
            : {}),

          ...(data.category === "" ? {} : { category: data.category }),
        },
        _count: true,
      });
      const newOrder = activeOrder.map(({ userId, ...item }) => item);
      res.status(200).json({ newOrder, count: activeOrderCount._count });
    }
  }
};
export default adminHandler;
