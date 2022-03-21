import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Body } from "./styles";

export const DatePickerComponent = ({ isDate, setDate }) => {
  const [startDate, setStartDate] = useState(isDate ? isDate : null);
  function handleChanged(date) {
    setStartDate(date);
    setDate(date);
  }

  return (
    <Body>
      <DatePicker selected={startDate} onChange={handleChanged} />
    </Body>
  );
};
