import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLessons } from "../../store/actions";
import TimeSlot from "../timeSlot/TimeSlot";
import './style.scss';

const TimeSlotList = () => {
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.user.token);
  const lessons = useSelector((state) => state.user.lessons);

  useEffect(() => {
    dispatch(getLessons());
    console.log("Lessons (time slots) >>> ", lessons);
  }, [jwt])

  return (
    <div className="timeslot_container">
        {/* Create the list of slots only if the array of lessons is not empty */}
        {lessons && 
            (lessons.map((lesson) => (<TimeSlot start={lesson.dateTimeFrom} end={lesson.dateTimeTo} key={lesson.id} id={lesson.id} />)))
        }
    </div>
  )
};

export default TimeSlotList;
