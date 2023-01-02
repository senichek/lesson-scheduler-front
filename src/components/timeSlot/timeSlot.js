import PropTypes from 'prop-types';
import moment from "moment/moment";

const TimeSlot = ({start, end}) => {

    const day = moment(start).format("LL");
    const startTime = moment(start).format("LT");
    const endTime = moment(end).format("LT");

  return (
    <div className="timeslot">
        <div className="timeslot__delete_btn"></div>
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
