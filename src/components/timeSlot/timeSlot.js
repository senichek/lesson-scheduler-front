import PropTypes from 'prop-types';
import moment from "moment/moment";
import { useSelector } from 'react-redux';
import './style.scss';
import { FaTrash } from "react-icons/fa";
import { deleteLesson } from '../../store/actions';
import { useDispatch } from 'react-redux';

const TimeSlot = ({start, end, id}) => {

    const role = useSelector((state) => state.user.role);

    const day = moment(start).format("LL");
    const startTime = moment(start).format("LT");
    const endTime = moment(end).format("LT");

    const dispatch = useDispatch();

    const handleTimeSlotDelete = (event) => {
      const slotId = event.currentTarget.id
      console.log(`Deletion of timeslot id ${slotId} has been invoked.`)
      dispatch(deleteLesson(slotId));
    }

  return (
    <div className="timeslot" id={id}>
      {/* Delete button is only available to Admins */}
      {role === '[ROLE_ADMIN]' &&
        <div className="timeslot__delete_btn"><FaTrash onClick={handleTimeSlotDelete} id={id} /></div>
      }
        <div className="timeslot__date">{day}</div>
        <div className="timeslot__times">
            <div className="timeslot__from">{startTime}</div>
            <div className="timeslot__to">{endTime}</div>
        </div>
    </div>
  )
};

TimeSlot.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string
  };

export default TimeSlot;
