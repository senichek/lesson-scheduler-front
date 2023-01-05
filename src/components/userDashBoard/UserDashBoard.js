import { useDispatch } from 'react-redux';
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { getUnreservedLessons, getReservedLessons } from '../../store/actions';
import './style.scss';

import "react-datepicker/dist/react-datepicker.css";
import TimeSlotList from "../timeSlotList/TimeSlotList";

const UserDashBoard = () => {

    const dispatch = useDispatch();

    // All reserved slots (lessons) of the logged-in user
    const showBooked = () => {
      console.log("showBooked() was invoked")
      dispatch(getReservedLessons());
    }

    const showAvailable = () => {
      console.log("showAvailable() was invoked")
      dispatch(getUnreservedLessons());
    }

  
    return (
        <>
        <div className="description__container">
          {/* <div className="description__text">Click <FaCheckCircle /> or <FaBan /> to reserve the time slot or to cancel the reservation</div> */}
          <div className="description__text">Click <FaCheckCircle className="description__icons" /> to reserve the time slot or <FaBan className="description__icons" /> to cancel the reservation</div>
        </div>
        <div className="filter_buttons">
        <button className="filter_buttons__available"onClick={showAvailable} >Available</button>
        <button className="filter_buttons__booked" onClick={showBooked}>Booked</button>
        </div>
          <TimeSlotList />
        </>
    );
}

export default UserDashBoard;