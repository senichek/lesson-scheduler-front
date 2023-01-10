import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getSingleLesson } from "../../store/actions";
import { FaPen } from "react-icons/fa";
import moment from "moment/moment";

import './style.scss';

const LessonDetailsCard = () => {

    // id of lessonId will be received from browser's URL
    // The name of param "lessonId" is specified in App.js file
    let { lessonId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector((state) => state.user.role);
    const jwt = useSelector((state) => state.user.token);
    // There would be one lesson in the collection
    const lesson = useSelector((state) => state.user.lessons[0]);

    useEffect(() => {
        if (jwt) {
            dispatch(getSingleLesson(lessonId))
        }
    }, [jwt])

    const handleGoBack = () => {
        if (role === '[ROLE_ADMIN]') {
            return navigate('/admindashboard');
        }
        if (role === '[ROLE_USER]') {
            return navigate('/userdashboard');
        }
    }

  return (
    <>
        {lesson &&
            <div className="lessoncard">
                <div className="lessoncard__date_container">
                    <div className="lessoncard__weekday">
                    {/* moment(end).format("LT"); */}
                        {moment(lesson.dateTimeFrom).format('dddd')}
                    </div>
                    <div className="lessoncard__month">
                    {moment(lesson.dateTimeFrom).format('MMMM')}
                    </div>
                    <div className="lessoncard__day">
                    {moment(lesson.dateTimeFrom).format('DD')}
                    </div>
                    <div className="lessoncard__year">
                    {moment(lesson.dateTimeFrom).format('YYYY')}
                    </div>
                </div>
                <div className="lessoncard__details_container">
                    <div className="lessoncard__time_period">
                    {moment(lesson.dateTimeFrom).format('hh:mm A')} -&nbsp;
                    {moment(lesson.dateTimeFrom).format('hh:mm A')}
                    </div>
                    <div className="lessoncard__description" >
                        Description: {lesson.description} &nbsp;
                        <FaPen className="lessoncard__description_edit_btn"></FaPen>
                    </div>
                    {lesson.studentName &&
                        <div className="lessoncard__studentname">
                            Reserved by: {lesson.studentName}
                        </div>
                    }
                </div>
            </div>
        }
        <div className="btn_container">
            <button className="goback_btn" onClick={handleGoBack}>Go back</button>
        </div>
    </>
  );
};

export default LessonDetailsCard;
