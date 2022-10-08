import React, { Dispatch, useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import moment from "moment";
import DatePicker from "react-datepicker";
type Item = {
  name: string;
  quantity: number;
  store: string;
};
interface ActiveOrder {
  category: string[];
  orderItem: Item[];
  name: string;
  createdAt: string;
  active: boolean;
  phoneNumber: string;
  location: string;
}
type Props = {
  setOrder: Dispatch<ActiveOrder[]>;
};
const DateRangePicker = (props: Props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    let startDate = dateRange[0];
    let endDate = dateRange[1];
    console.log(startDate);

    if (startDate && endDate !== null) {
      let url = "http://localhost:3000/api/order";

      url +=
        "?" +
        new URLSearchParams({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
        }).toString();

      const handleRequest = async () => {
        console.log("Sending request");
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await res.json();
        props.setOrder(response);
      };
      handleRequest();

      return () => handleRequest();
    }
  }, [dateRange]);

  const [startDate, endDate] = dateRange;
  return (
    <div className="calendar-wrapper">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        placeholderText={"Please select a date"}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
      />
    </div>
  );
};

export default DateRangePicker;
