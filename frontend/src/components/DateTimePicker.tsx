import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importowanie stylów
import { BiSolidCalendar } from "react-icons/bi";

const DateTimePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="flex justify-center items-center gap-2">
        <BiSolidCalendar className="icon"/>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={15} // co ile minut można wybierać godzinę
          dateFormat="dd/MM/yyyy; HH:mm" // format daty i godziny
          className="input input-bordered"
        />
    </div>
  );
};

export default DateTimePicker;
