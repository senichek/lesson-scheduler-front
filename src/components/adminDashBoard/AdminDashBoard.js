import { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { setStartEnd, createLesson } from "../../store/actions";
import { useDispatch } from 'react-redux';
import moment from "moment/moment";
import './style.scss';

import "react-datepicker/dist/react-datepicker.css";
import TimeSlotList from "../timeSlotList/TimeSlotList";

const AdminDashBoard = () => {

    const dispatch = useDispatch();

    const [showDatePicker, setShowDatePicker] = useState(false); // Shows/hides the datetime picker

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
        setShowDatePicker(!showDatePicker); // Close the date picker
        console.log("confirmDateTime was called with the following dates:")
        // Transforming dates into times stamps using https://momentjs.com/
        const start = moment(startDate).format().substring(0, 16);
        const end = moment(endDate).format().substring(0, 16);
        console.log(start);
        console.log(end);
        dispatch(setStartEnd(start, end));
        dispatch(createLesson());
    }
    return (
        <>
        <div className="create_slot__container">
          <button className="create_slot__btn" onClick={() => setShowDatePicker(!showDatePicker)}>Create time slot</button>
        </div>
          {showDatePicker && (
            <div className="create_slot__datepicker_container">
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            popperPlacement="top"
            />
            <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            popperPlacement="top"
            />
            <button className="create_slot__confirm_btn" onClick={confirmDateTime}>Confirm</button>
            </div>
          )}
          <TimeSlotList />
        </>
    );
}

export default AdminDashBoard;