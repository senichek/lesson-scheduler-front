import { useDispatch } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";
import './style.scss';

import "react-datepicker/dist/react-datepicker.css";
import TimeSlotList from "../timeSlotList/TimeSlotList";

const UserDashBoard = () => {

    const dispatch = useDispatch();

  
    return (
        <>
        <div className="description__container">
          <div className="description__text">Click  <FaCheckCircle />  to reserve the time slot</div>
        </div>
          <TimeSlotList />
        </>
    );
}

export default UserDashBoard;