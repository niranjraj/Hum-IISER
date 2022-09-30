import type { NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import MainContainer from "../layout/MainContainer";

import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { IoClose } from "react-icons/io5";
import {
  OrderPage1,
  OrderPage2,
  OrderPage3,
  OrderPage4,
} from "../components/OrderPage";
import SideNav from "../components/SideNav";

type Item = {
  name: string;
  quantity: number;
  store: string;
};
interface FormValues {
  category: string[];
  items: Item[];
  name: string;
  phoneNumber: string;
  location: string;
}
interface ActiveOrder {
  category: string[];
  items: Item[];
  name: string;
  createdAt: string;
  active: boolean;
  phoneNumber: string;
  location: string;
}

const Account: NextPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [activeOpen, setActiveOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>({
    category: [
      "SupremeGourmet",
      "Dominos",
      "ExoticaStore",
      "Nilgiris",
      "Other",
    ],
    createdAt: new Date().toLocaleDateString(),
    items: [
      {
        name: "cheese",
        quantity: 2,
        store: "ExoticaStore",
      },
      {
        name: "burge",
        quantity: 2,
        store: "Dominos",
      },
    ],
    name: "niranj",
    active: true,
    phoneNumber: "123343213422",
    location: "near thambankadavu",
  });
  const [data, setData] = useState<FormValues>({
    category: [],
    items: [],
    name: "",
    phoneNumber: "",
    location: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [initialCategory, setInitialCategory] = useState({
    supermarket: false,
    restaurant: false,
  });

  const handleNextStep = (newData: FormValues, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      setOrderModal(false);
      setCurrentStep(0);
      setData({
        category: [],
        items: [],
        name: "",
        phoneNumber: "",
        location: "",
      });
      console.log(data);
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
      initialCategory={initialCategory}
      next={handleNextStep}
      prev={handlePrevStep}
    />,
    <OrderPage3
      key="order-3"
      formData={data}
      next={handleNextStep}
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
                <li
                  className="active-order-item"
                  onClick={() => setActiveOpen((prev) => !prev)}
                >
                  <div className="active-order-user">{activeOrder.name}</div>
                  <div className="active-order-date">
                    {activeOrder.createdAt}
                  </div>
                  <div className="active-order-status">
                    <div className="active-order-status-circle"></div>
                    <p>active</p>
                  </div>
                </li>
                {activeOpen && (
                  <div className="active-in-detail">
                    <div className="active-item-wrapper">
                      {Object(activeOrder.items).map(
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
                        {activeOrder.name}
                      </p>
                      <p>
                        <span>Address:</span>
                        {activeOrder.location}
                      </p>
                      <p>
                        <span>PhoneNumber:</span>
                        {activeOrder.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}
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

export default Account;
