import type { NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import MainContainer from "../layout/MainContainer";

import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  OrderPage1,
  OrderPage2,
  OrderPage3,
  OrderPage4,
} from "../components/OrderPage";

type Item = {
  name: string;
  quantity: number;
};
interface FormValues {
  category: string[];
  items: Item[];
  name: string;
  phoneNumber: string;
  location: string;
}

const Account: NextPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [orderModal, setOrderModal] = useState<boolean>(false);
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
      return;
    }
    setCurrentStep((prev) => prev + 1);
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
      <MainContainer>
        <div className="account-container">
          <div className="account-content">
            <h1>Easy order, easy life</h1>
            <p>
              The best delivery service in town, Get all you need at your door
              step.
            </p>
            <button className="order-btn" onClick={() => setOrderModal(true)}>
              Start your order?
            </button>
          </div>
          {orderModal && (
            <div className="order-modal-wrapper">
              <div className="order-modal">{pages[currentStep]}</div>
            </div>
          )}
        </div>
      </MainContainer>
    );
  }
  return <div></div>;
};

export default Account;
