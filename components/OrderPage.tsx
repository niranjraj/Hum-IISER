import React, { Dispatch, SetStateAction, useState } from "react";
import { Field, FieldArray, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import * as yup from "yup";
import "yup-phone-lite";
import Input from "./Input";
import formErrorMsg from "../utils/errorMessage";

const FormSchema = yup.object().shape({
  category: yup
    .array()
    .min(1, "Select atleast one store in order to continue."),
});

const FormSchema4 = yup.object().shape({
  name: yup.string().required("- All fields must be filled."),
  phoneNumber: yup
    .string()
    .phone("IN", "- Phone number is not valid")
    .required("- All fields must be filled."),
  location: yup.string().required("- All fields must be filled"),
});
const FormSchema2 = yup.object().shape({
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("- All fields must be filled."),
        quantity: yup
          .number()
          .typeError("- Invalid input.")
          .required("- All fields must be filled.")
          .max(9999999999, "- Quantity limit reached.")
          .min(0, "- Invalid input."),
      })
    )
    .min(1, "Atleast one item must be added"),
});
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

type Props1 = {
  setCategory: Dispatch<
    SetStateAction<{ supermarket: boolean; restaurant: boolean }>
  >;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  initialCategory: { supermarket: boolean; restaurant: boolean };
};

type OrderProps2 = {
  formData: FormValues;
  initialCategory: { supermarket: boolean; restaurant: boolean };
  next: (newData: any, final?: boolean) => void;
  prev: (newData: any) => void;
};
type OrderProps3 = {
  formData: FormValues;

  next: (newData: any, final?: boolean) => void;
  prev: (newData: any) => void;
};

export const OrderPage1 = (props: Props1) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const handleNextStep = () => {
    if (props.initialCategory.restaurant || props.initialCategory.supermarket) {
      props.setCurrentStep((prev) => prev + 1);
    } else {
      setErrorMsg("Select an option to continue");
    }
  };
  return (
    <div className="order-page-1">
      <h2>{`Let's get you started!`}</h2>
      <p>What are you looking for?</p>
      {errorMsg && <div className="validation-msg">{errorMsg}</div>}
      <div className="order-section">
        <div
          className="supermarket-wrapper"
          onClick={() =>
            props.setCategory((prev) => ({
              ...prev,
              supermarket: !prev.supermarket,
            }))
          }
        >
          <Image
            src="/static/supermarket.png"
            width="150"
            height="150"
            alt="supermarket"
          />
        </div>
        <div
          className="restaurant-wrapper"
          onClick={() =>
            props.setCategory((prev) => ({
              ...prev,
              restaurant: !prev.restaurant,
            }))
          }
        >
          <Image
            src="/static/restaurant.png"
            width="150"
            height="150"
            alt="restaurant"
          />
        </div>
      </div>

      <button className="next-step-button" onClick={handleNextStep}>
        Next step
      </button>
    </div>
  );
};

export const OrderPage2 = (props: OrderProps2) => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values);
  };
  return (
    <div className="order-page-2">
      <h2>Choose your desired store</h2>
      <Formik
        initialValues={props.formData}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        {({ values, errors }) => (
          <Form>
            <div className="fields-wrapper">
              {errors.category && (
                <div className="validation-msg">{errors.category}</div>
              )}
              {props.initialCategory.supermarket && (
                <>
                  <h3>Supermarket Section</h3>
                  <div className="supermarket-section">
                    <label>
                      <Field type="checkbox" name="category" value="Nilgiris" />
                      <Image
                        src="/static/Nilgiris.png"
                        width="150"
                        height="150"
                        alt="Nilgiris"
                      />
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="category"
                        value="ExoticaStore"
                      />
                      <Image
                        src="/static/ExoticaStore.png"
                        width="150"
                        height="150"
                        alt="ExoticaStore"
                      />
                    </label>
                  </div>
                </>
              )}
              {props.initialCategory.restaurant && (
                <>
                  <h3>Restaurant Section</h3>
                  <div className="restaurant-section">
                    <label>
                      <Field type="checkbox" name="category" value="Dominos" />
                      <Image
                        src="/static/Dominos.png"
                        width="150"
                        height="150"
                        alt="Dominos"
                      />
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="category"
                        value="SupremeGourmet"
                      />
                      <Image
                        src="/static/SupremeGourmet.png"
                        width="150"
                        height="150"
                        alt="Supreme Gourmet"
                      />
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="category"
                        value="PaulsCreamery"
                      />
                      <Image
                        src="/static/PaulsCreamery.png"
                        width="150"
                        height="150"
                        alt="Paul's Creamery"
                      />
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="category"
                        value="SankersCoffe"
                      />
                      <Image
                        src="/static/SankersCoffe.png"
                        width="150"
                        height="150"
                        alt="Sanker's Coffee"
                      />
                    </label>
                  </div>
                </>
              )}
              <h3>From other stores</h3>
              <label className="other-options">
                <Field type="checkbox" name="category" value="Other" />
                <Image
                  src="/static/Other.png"
                  width="150"
                  height="150"
                  alt="Other"
                />
              </label>
            </div>
            <div className="form-bottom">
              <div className="form-nav-btn-wrapper">
                <button
                  className="prev-step-button"
                  type="button"
                  onClick={() => props.prev(values)}
                >
                  Go back
                </button>
                <button className="next-step-button" type="submit">
                  Next step
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const OrderPage3 = (props: OrderProps3) => {
  const handleSubmit = (values: FormValues) => {
    props.next(values);
  };

  return (
    <div className="order-page-3">
      <h2>Add items of your choice</h2>
      <Formik
        initialValues={props.formData}
        onSubmit={handleSubmit}
        validationSchema={FormSchema2}
      >
        {({ values, errors }) => (
          <Form>
            <div className="fields-wrapper">
              {errors.items &&
                errors.items?.length > 0 &&
                formErrorMsg(errors.items).map(
                  (item: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="validation-msg order-item-validation"
                      >
                        {item}
                      </div>
                    );
                  }
                )}
              <fieldset className="itemList-wrapper">
                <legend className="itemList-legend">ItemList</legend>
                <FieldArray
                  name="items"
                  render={(helpers) => {
                    return (
                      <div className="orderForm-itemList">
                        {values.items.map((item, index) => {
                          return (
                            <div className="orderForm-item-wrapper" key={index}>
                              <Input
                                label="Item Name"
                                name={`items[${index}].name`}
                                hideLabels={index > 0}
                              />

                              <Input
                                label="Qty."
                                name={`items[${index}].quantity`}
                                hideLabels={index > 0}
                              />

                              <div className="delete-btn-wrapper">
                                <p>Delete Item</p>
                                <button
                                  className="delete-item-btn"
                                  type="button"
                                  onClick={() => helpers.remove(index)}
                                >
                                  <Image
                                    src="/static/icon-delete.svg"
                                    alt="delete"
                                    width="16"
                                    height="16"
                                  />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          className="add-item-btn"
                          type="button"
                          onClick={() => {
                            helpers.push({
                              name: "",
                              quantity: "",
                            });
                          }}
                        >
                          + Add New Item
                        </button>
                      </div>
                    );
                  }}
                />
              </fieldset>
            </div>
            <div className="form-bottom">
              <div className="form-nav-btn-wrapper">
                <button
                  className="prev-step-button"
                  type="button"
                  onClick={() => props.prev(values)}
                >
                  Go back
                </button>
                <button className="next-step-button" type="submit">
                  Next step
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const OrderPage4 = (props: OrderProps3) => {
  const [confirmOrder, setConfirmOrder] = useState(false);
  const handleSubmit = (values: FormValues) => {
    setConfirmOrder(true);
    props.next(values, true);
  };
  const handleConfirm = () => {};

  return (
    <div className="order-page-4">
      {confirmOrder ? (
        <h2>Complete order now</h2>
      ) : (
        <h2>Fill contact information</h2>
      )}
      <Formik
        initialValues={props.formData}
        onSubmit={handleSubmit}
        validationSchema={FormSchema4}
      >
        {({ values, errors }) => (
          <Form>
            {confirmOrder ? (
              <div className="confirm-order-wrapper">
                <div className="order-confirmation-summary">
                  <div className="order-item-summary">
                    <h4>Confirm these items?</h4>
                    <div className="items-in-order">
                      {values.items.map((item, index) => {
                        return (
                          <div
                            className="summary-item"
                            key={`${item.name}-${index}`}
                          >
                            <p>{item.name}</p>
                            <p>{item.quantity}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="store-item-summary">
                    <h4>Order from the following stores</h4>
                    <div className="stores-in-order">
                      {values.category.map((item, index) => {
                        return (
                          <div
                            className="summary-store"
                            key={`${item}-${index}`}
                          >
                            <Image
                              src={`/static/${item}.png`}
                              width="60"
                              height="60"
                              alt={item}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="confirm-btn-wrapper">
                  <button
                    type="button"
                    className="cancel-order-btn"
                    onClick={() => setConfirmOrder(false)}
                  >
                    Cancel Order
                  </button>
                  <button type="submit" className="complete-btn">
                    Complete Order
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="fields-wrapper">
                  {(errors.location || errors.phoneNumber || errors.name) && (
                    <div className="validation-msg ">
                      {errors.name
                        ? errors.name
                        : errors.location
                        ? errors.location
                        : errors.phoneNumber}
                    </div>
                  )}
                  <div className="order-form-contact">
                    <Input label="Name" name="name" />
                    <Input label="PhoneNumber" name="phoneNumber" />
                    <Input label="Address" name="location" />
                  </div>
                  <div className="order-contact-details">
                    <h4>Important Info</h4>
                    <p>
                      Please make sure the order is as per your need before
                      submiting the order.
                    </p>
                    <p>
                      Once the order is confirmed it cannot be updated or
                      modified.
                    </p>
                  </div>
                </div>
                <div className="form-bottom">
                  <div className="form-nav-btn-wrapper">
                    <button
                      className="prev-step-button"
                      type="button"
                      onClick={() => props.prev(values)}
                    >
                      Go back
                    </button>
                    <button
                      className="next-step-button"
                      type="button"
                      onClick={() => setConfirmOrder(true)}
                    >
                      Complete Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
