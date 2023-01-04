import { useDispatch } from 'react-redux';
import './style.scss';

import "react-datepicker/dist/react-datepicker.css";
import TimeSlotList from "../timeSlotList/TimeSlotList";

const UserDashBoard = () => {

    const dispatch = useDispatch();

  
    return (
        <>
        <div className="description__container">
          <div className="description__text">Click the time slot to reserve it</div>
        </div>
          <TimeSlotList />
        </>
    );
}

export default UserDashBoard;