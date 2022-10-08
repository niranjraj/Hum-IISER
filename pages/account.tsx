import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import { Item, FormValues, ActiveOrder } from "../types/order";
import prisma from "../utils/prismaInit";
import { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import {
  OrderPage1,
  OrderPage2,
  OrderPage3,
  OrderPage4,
} from "../components/OrderPage";
import SideNav from "../components/SideNav";

const Account: NextPage = (props) => {
  const { data: session, status } = useSession({ required: true });
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [activeOpen, setActiveOpen] = useState<boolean>(false);
  const [storeValue, setStoreValue] = useState<string | null>(null);

  const [activeOrder, setActiveOrder] = useState<Array<ActiveOrder>>(
    props.activeData
  );

  const [data, setData] = useState<FormValues>({
    category: "",
    orderItem: [],
    name: "",
    phoneNumber: "",
    location: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [initialCategory, setInitialCategory] = useState({
    supermarket: false,
    restaurant: false,
  });
  const [currentStore, setCurrentStore] = useState(null);

  const handleRequest = async (formValues: FormValues) => {
    const res = await fetch("http://localhost:3000/api/order", {
      body: JSON.stringify(formValues),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    setActiveOrder((prev) => [response, ...prev]);
  };

  const handleNextStep = (newData: FormValues, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      setOrderModal(false);
      setCurrentStep(0);

      handleRequest(newData);
      setData({
        category: "",
        orderItem: [],
        name: "",
        phoneNumber: "",
        location: "",
      });

      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePreComplete = (newData: FormValues) => {
    setData((prev) => ({ ...prev, ...newData }));
  };
  const handlePrevStep = (newData: FormValues) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const pages = [
    <OrderPage1
      setCategory={setInitialCategory}
      initialCategory={initialCategory}
      setCurrentStep={setCurrentStep}
      key="order-1"
    />,
    <OrderPage2
      key="order-2"
      formData={data}
      setStoreValue={setStoreValue}
      initialCategory={initialCategory}
      next={handleNextStep}
      prev={handlePrevStep}
    />,
    <OrderPage3
      key="order-3"
      formData={data}
      next={handleNextStep}
      storeValue={storeValue}
      setStoreValue={setStoreValue}
      prev={handlePrevStep}
    />,
    <OrderPage4
      key="order-4"
      formData={data}
      next={handleNextStep}
      prev={handlePrevStep}
      preComplete={handlePreComplete}
    />,
  ];

  useEffect(() => {
    if (orderModal) {
      document.body.classList.add("form-modal-open");
    } else {
      if (document.body.classList) {
        document.body.classList.remove("form-modal-open");
      }
    }
  }, [orderModal]);

  if (status === "authenticated") {
    return (
      <div className="account-container">
        <SideNav />
        <div className="account-content">
          <div className="account-header">
            <h2>My Orders</h2>
            <button className="order-btn" onClick={() => setOrderModal(true)}>
              Order Now
            </button>
          </div>

          <div className="user-active-order">
            <div className="active-order-list-wrapper">
              <ul className="active-order-list">
                {activeOrder.map((item, index) => {
                  return (
                    <div key={`${item}-${index}`}>
                      <li
                        className="active-order-item"
                        onClick={() => setActiveOpen((prev) => !prev)}
                      >
                        <div className="active-order-user">{item.name}</div>
                        <div className="active-order-date">
                          {item.createdAt}
                        </div>
                        <div className="active-order-status">
                          <div className="active-order-status-circle"></div>
                          <p>active</p>
                        </div>
                      </li>
                      {activeOpen && (
                        <div className="active-in-detail">
                          <div className="active-item-wrapper">
                            {Object(item.orderItem).map(
                              (item: Item, index: number) => {
                                return (
                                  <div
                                    className="active-item"
                                    key={`active-${item}-${index}`}
                                  >
                                    <p>{item.name}</p>
                                    <p>{item.quantity}</p>
                                    <p>{item.store}</p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="active-order-info">
                            <h4>Order Info</h4>
                            <p>
                              <span>Name:</span>
                              {item.name}
                            </p>
                            <p>
                              <span>Address:</span>
                              {item.location}
                            </p>
                            <p>
                              <span>PhoneNumber:</span>
                              {item.phoneNumber}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {orderModal && (
          <div className="order-modal-wrapper">
            <div className="order-modal">
              <div
                className="close-modal-wrapper"
                onClick={() => setOrderModal(false)}
              >
                <IoClose />
              </div>
              {pages[currentStep]}
            </div>
          </div>
        )}
      </div>
    );
  }
  return <div></div>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  let activeData: any = [];
  if (session && session.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });

    const activeOrder = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: { active: true, userId: user?.id },
      include: {
        orderItem: {
          select: {
            name: true,
            quantity: true,
            unit: true,
            store: true,
          },
        },
      },
    });
    activeData = activeOrder;

    activeData = activeData.map((item: ActiveOrder) => {
      return { ...item, createdAt: JSON.stringify(item.createdAt) };
    });
  }

  return {
    props: { activeData },
  };
};

export default Account;
