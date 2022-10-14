import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import SideNav from "../../components/SideNav";

import Link from "next/link";
import { useState } from "react";
import { current } from "@reduxjs/toolkit";
import prisma from "../../utils/prismaInit";
import { statusColors } from "../../utils/initialValues";
import { useSession } from "next-auth/react";

const AdminPreview: NextPage = (props) => {
  const { data: session, status } = useSession({ required: true });
  const [modal, setModal] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(props.serializedOrder);
  const router = useRouter();
  const handleConfirm = async () => {
    if (currentPreview.active) {
      const res = await fetch("http://localhost:3000/api/order/active", {
        body: JSON.stringify([currentPreview.id]),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();

      setCurrentPreview(response);
    }
  };
  if (session && session.user.role == "user") {
    router.push("/");
  }
  if (session && session.user.role == "admin") {
    return (
      <div className="admin-preview-container">
        <SideNav />
        <div className="admin-preview-content-wrapper">
          {modal && (
            <div className="modal-wrapper">
              <div className="modal-container">
                <h3>Confirm payment for this Order?</h3>

                <div>
                  <button className="confirm-paid-btn">Paid</button>
                  <button
                    className="cancel-btn"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="admin-order-detail-wrapper">
            <div className="admin-preview-header">
              <div className="admin-preview-id">Id: #{currentPreview.id}</div>
              <div
                className="admin-order-status"
                style={{
                  backgroundColor: `${
                    currentPreview.active
                      ? statusColors.active.transColor
                      : statusColors.confirmed.transColor
                  }`,
                }}
              >
                <div
                  className="admin-order-status-circle"
                  style={{
                    backgroundColor: `${
                      currentPreview.active
                        ? statusColors.active.backgroundColor
                        : statusColors.confirmed.backgroundColor
                    }`,
                  }}
                ></div>
                <p
                  style={{
                    color: `${
                      currentPreview.active
                        ? statusColors.active.color
                        : statusColors.confirmed.color
                    }`,
                  }}
                >
                  {currentPreview.active ? "active" : "confirmed"}
                </p>
              </div>
            </div>
            <div className="order-preview-store">
              <div className="admin-preview-paid">Not Paid</div>
              <div className="admin-preview-store">
                <div className="admin-preview-store-name">
                  {currentPreview.orderItem[0].store}
                </div>
                <Image
                  src={`/static/${currentPreview.category}.png`}
                  alt={currentPreview.orderItem[0].store}
                  height="100"
                  width="100"
                />
              </div>
            </div>
            <div className="admin-preview-info">
              <h3>Client Info:</h3>
              <p>
                <span>Name:</span> {currentPreview.name}
              </p>
              <p>
                <span>Address: </span>
                {currentPreview.location}
              </p>
              <p>
                <span>PhoneNumber: </span>
                {currentPreview.phoneNumber}
              </p>
            </div>
            <div className="admin-preview-order-header">
              <div className="admin-header-preview-name">Client</div>
              <div className="admin-header-preview-qty">Quantity</div>
              <div className="admin-header-preview-unit">Unit</div>
            </div>
            <div className="admin-preview-order">
              {currentPreview.orderItem.map((item, index) => {
                return (
                  <div
                    className="admin-preview-item"
                    key={`${index}-${item.name}`}
                  >
                    <div className="admin-preview-name">{item.name}</div>
                    <div className="admin-preview-qty">{item.quantity}</div>
                    <div className="admin-preview-unit">{item.unit}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="admin-preview-buttons-wrapper">
            <button onClick={() => router.push("/admin")}>Back</button>
            <button onClick={() => handleConfirm()}>Confirm</button>
            <button onClick={() => setModal(true)}>Payment</button>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const orderId = context.params?.id as string;
  if (orderId) {
    const orderExist = await prisma.order.findUnique({
      where: {
        id: orderId,
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

    if (!orderExist) {
      return {
        redirect: {
          permanent: false,
          destination: "/admin",
        },
      };
    }
    const { userId, createdAt, ...orderInfo } = orderExist;
    const serializedOrder = {
      ...orderInfo,
      createdAt: JSON.stringify(createdAt),
    };

    return {
      props: { serializedOrder },
    };
  }

  return {
    props: {},
  };
};

export default AdminPreview;
