import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLessons, getUnreservedLessons } from "../../store/actions";
import TimeSlot from "../timeSlot/TimeSlot";
import './style.scss';

const TimeSlotList = () => {
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);
  const lessons = useSelector((state) => state.user.lessons);

  useEffect(() => {
    // Admin has access to all the lessons/slots
    if (role === '[ROLE_ADMIN]') {
      dispatch(getLessons());
    }
    // Users can only see the unreserved (available slots)
    if (role === '[ROLE_USER]') {
      dispatch(getUnreservedLessons());
    }
  }, [jwt])

  return (
    <div className="timeslot_container">
        {/* Create the list of slots only if the array of lessons is not empty */}
        {lessons && 
            (lessons.map((lesson) => (<TimeSlot start={lesson.dateTimeFrom} end={lesson.dateTimeTo} key={lesson.id} id={lesson.id} reserved={lesson.reserved} />)))
        }
    </div>
  )
};

export default TimeSlotList;
