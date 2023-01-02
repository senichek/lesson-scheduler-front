import { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { setStartEnd, createLesson } from "../../store/actions";
import { useDispatch } from 'react-redux';
import moment from "moment/moment";

import "react-datepicker/dist/react-datepicker.css";

const AdminDashBoard = () => {

    const dispatch = useDispatch();

    // https://reactdatepicker.com/#example-filter-times
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 0), 9)
      );

    const [endDate, setEndDate] = useState(
        setHours(setMinutes(new Date(), 0), 9)
      );

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
      };
    
    const confirmDateTime = () => {
        console.log("confirmDateTime was called with the following dates:")
        console.log(moment(startDate).format());
        console.log(moment(endDate).format());
        // Transforming dates into times stamps using https://momentjs.com/
        dispatch(setStartEnd(moment(startDate).format(), moment(endDate).format()));
        dispatch(createLesson());
    }
    return (
        <>
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            />
            <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            />
            <button onClick={confirmDateTime}>Confirm</button>
        </>
    );
}

export default AdminDashBoard;