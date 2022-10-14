import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import { Item, FormValues, ActiveOrder } from "../types/order";
import Image from "next/image";
import prisma from "../utils/prismaInit";

import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import {
  OrderPage1,
  OrderPage2,
  OrderPage3,
  OrderPage4,
} from "../components/OrderPage";
import SideNav from "../components/SideNav";
import moment from "moment";
import { wrapper } from "../redux/store";
import {
  setActiveOrder,
  setFormValue,
  updateActiveOrder,
} from "../redux/order-slice";

import { useAppSelector, useAppDispatch } from "../redux/redux-hook";

const Account: NextPage = (props) => {
  const orderItemRef = useRef<Array<HTMLDivElement | null>>([]);
  const { data: session, status } = useSession({ required: true });
  const [orderModal, setOrderModal] = useState<boolean>(false);

  const [storeValue, setStoreValue] = useState<string | null>(null);
  const activeOrder = useAppSelector((state) => state.order.activeOrder);
  const formData = useAppSelector((state) => state.order.formValue);
  const initialCategory = useAppSelector(
    (state) => state.order.initialCategory
  );

  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(0);
  // const [initialCategory, setInitialCategory] = useState({
  //   supermarket: false,
  //   restaurant: false,
  // });

  const handleClick = (index: number) => {
    const item = orderItemRef?.current;
    if (item[index] && item[index]?.classList.contains("active-open")) {
      item[index]?.classList.remove("active-open");
    } else {
      item[index]?.classList.add("active-open");
    }
    console.log();
  };
  const handleRequest = async (formValues: FormValues) => {
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        body: JSON.stringify(formValues),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(`response:${response}`);

      dispatch(updateActiveOrder(response));
    } catch (error) {
      console.log(error);
    }

    // setActiveOrder((prev) => [response, ...prev]);
  };

  const handleNextStep = (newData: FormValues, final = false) => {
    dispatch(setFormValue({ ...formData, ...newData }));

    if (final) {
      setOrderModal(false);
      setCurrentStep(0);

      handleRequest(newData);

      dispatch(
        setFormValue({
          category: "",
          orderItem: [],
          name: "",
          phoneNumber: "",
          location: "",
        })
      );

      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePreComplete = (newData: FormValues) => {
    dispatch(setFormValue({ ...formData, ...newData }));
  };
  const handlePrevStep = (newData: FormValues) => {
    dispatch(setFormValue({ ...formData, ...newData }));

    setCurrentStep((prev) => prev - 1);
  };

  const pages = [
    <OrderPage1
      initialCategory={initialCategory}
      setCurrentStep={setCurrentStep}
      key="order-1"
    />,
    <OrderPage2
      key="order-2"
      formData={formData}
      setStoreValue={setStoreValue}
      initialCategory={initialCategory}
      next={handleNextStep}
      prev={handlePrevStep}
    />,
    <OrderPage3
      key="order-3"
      formData={formData}
      next={handleNextStep}
      storeValue={storeValue}
      setStoreValue={setStoreValue}
      prev={handlePrevStep}
    />,
    <OrderPage4
      key="order-4"
      formData={formData}
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
                {activeOrder.length > 0 &&
                  activeOrder.map((item, index) => {
                    return (
                      <div
                        key={`${item}-${index}`}
                        className="active-order-item-wrapper"
                        ref={(el) => (orderItemRef.current[index] = el)}
                        onClick={() => handleClick(index)}
                      >
                        <li className="active-order-item">
                          <div className="active-order-id">
                            {`#${item.id.slice(0, 6)}...`}
                          </div>
                          <div className="active-order-date">
                            {moment(
                              item.createdAt.split("T")[0],
                              "YYYY-MM-DD"
                            ).format("DD MMM YYYY")}
                          </div>
                          <div className="active-order-status">
                            <div className="active-order-status-circle"></div>
                            <p>active</p>
                          </div>
                        </li>

                        <div className="active-in-detail">
                          <div className="active-item-wrapper">
                            {Object(item.orderItem).map(
                              (orderContent: Item, index: number) => {
                                return (
                                  <div
                                    className="active-item"
                                    key={`active-${orderContent.name}-${index}`}
                                  >
                                    <p>{orderContent.name}</p>
                                    <p>{`${orderContent.quantity} ${
                                      orderContent.unit === "number"
                                        ? ""
                                        : orderContent.unit
                                    }`}</p>
                                    <Image
                                      src={`/static/${item.category}.png`}
                                      width="32"
                                      height="32"
                                      alt={item.category}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="active-order-info">
                            <h4>Order Info</h4>
                            <div className="active-lb">
                              <p>
                                <span className="active-lb-name">
                                  {item.name}
                                </span>
                                <span className="active-lb-location">
                                  {item.location}
                                </span>
                              </p>
                              <div className="active-lb-info">
                                <p>
                                  <span>Order Id:</span>
                                  {`#${item.id}`}
                                </p>

                                <p>
                                  <span>PhoneNumber:</span>
                                  {item.phoneNumber}
                                </p>
                                <p>
                                  <span>Store:</span>
                                  {item.orderItem[0].store}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

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
      activeData = activeOrder.map(({ userId, createdAt, ...rest }) => {
        return { ...rest, createdAt: JSON.stringify(createdAt) };
      });

      store.dispatch(setActiveOrder(activeData));
    }

    return {
      props: {},
    };
  }
);

//async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getSession(context);

//   let activeData: any = [];
//   if (session && session.user?.email) {
//     const user = await prisma.user.findUnique({
//       where: { email: session.user?.email },
//     });

//     const activeOrder = await prisma.order.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       where: { active: true, userId: user?.id },

//       include: {
//         orderItem: {
//           select: {
//             name: true,
//             quantity: true,
//             unit: true,
//             store: true,
//           },
//         },
//       },
//     });
//     activeData = activeOrder.map(({ userId, createdAt, ...rest }) => {
//       return { ...rest, createdAt: JSON.stringify(createdAt) };
//     });
//   }

//   return {
//     props: { activeData },
//   };
// };

export default Account;
