import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importowanie stylów
import { BiSolidCalendar } from "react-icons/bi";

interface DateTimePickerProps {
  setDate: (location: string) => void;
  date: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ setDate, date }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <BiSolidCalendar className="icon" />
      <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(date) => setDate(date?.toISOString().slice(0, 19) ?? "")}
        showTimeSelect
        timeIntervals={15}
        dateFormat="dd/MM/yyyy; HH:mm"
        className="input input-bordered"
      />
    </div>
  );
};

export default DateTimePicker;
