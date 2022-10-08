import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../utils/prismaInit";
import { formatISO } from "date-fns";

const orderHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session && session.user?.email) {
    if (req.method === "POST") {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email },
      });

      const order = await prisma.order.create({
        data: {
          ...req.body,
          orderItem: {
            create: req.body.orderItem,
          },
          userId: user?.id,
        },
        include: {
          orderItem: {
            select: {
              name: true,
              quantity: true,
              store: true,
              unit: true,
            },
          },
        },
      });
      console.log(order);

      res.status(200).json({
        active: order.active,
        name: order.name,
        phoneNumber: order.phoneNumber,
        location: order.location,
        category: order.category,
        createdAt: order.createdAt,
        orderItem: order.orderItem,
      });
    }
    if (req.method === "GET") {
      let startDate = new Date(String(req.query.startDate));
      let endDate = new Date(String(req.query.endDate));
      const activeOrder = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        take: 10,

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
      let activeData = activeOrder;
      res.status(200).json(activeData);
    }
  }
};
export default orderHandler;
