import { createElement } from "react";
import moment from "moment";
import React, { useState } from "react";
import HijriUtilsExtended from "../src/components/HijriUtilsExtended";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/ar-sa";

import "./ui/Arabicweb.css";

export function Arabicweb(props) {
    const [selectedDate, handleDateChange] = useState(moment());
    
    const handleDateChange1=(val)=>
    {
      handleDateChange(new Date(val));
      console.log(val);
      const {date}=props;
      date.setValue(new Date(val));
  
    }

    return (
      <MuiPickersUtilsProvider utils={HijriUtilsExtended} locale="ar-SA">
        <DatePicker
          autoOk="true"
          openTo="year"
          views={["year", "month", "date"]}
          clearable
          okLabel="موافق"
          cancelLabel="الغاء"
          clearLabel="مسح"
          labelFunc={(date) =>
            date ? date.locale("en").format("iMM/iDD/iYYYY") : ""
          }
          value={selectedDate}
          onChange={handleDateChange1}
          minDate="1937-03-14"
          maxDate="2076-11-26"
        />
      </MuiPickersUtilsProvider>
    );
}
