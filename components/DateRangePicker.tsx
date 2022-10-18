import React, { Dispatch, useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useAppDispatch } from "../redux/redux-hook";
import { setActiveOrder, setAdminOrder } from "../redux/order-slice";
import { useField, useFormikContext } from "formik";

const DateRangePicker = (props: { name: string }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField(props.name);

  // useEffect(() => {
  //   let startDate = dateRange[0];
  //   let endDate = dateRange[1];
  //   console.log(startDate);

  //   if (startDate && endDate !== null) {
  //     let url = "http://localhost:3000/api/order";

  //     url +=
  //       "?" +
  //       new URLSearchParams({
  //         startDate: moment(startDate).format("YYYY-MM-DD"),
  //         endDate: moment(endDate).format("YYYY-MM-DD"),
  //       }).toString();

  //     const handleRequest = async () => {
  //       console.log("Sending request");
  //       const res = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const response = await res.json();
  //       dispatch(setAdminOrder(response));
  //       // props.setOrder(response);
  //     };
  //     handleRequest();

  //     return () => handleRequest();
  //   }
  // }, [dateRange]);

  return (
    <div className="calendar-wrapper">
      <DatePicker
        selectsRange={true}
        startDate={field.value[0]}
        endDate={field.value[1]}
        placeholderText={"Please select a date"}
        onChange={(update) => {
          setFieldValue(field.name, update);
        }}
        isClearable={true}
      />
    </div>
  );
};

export default DateRangePicker;
