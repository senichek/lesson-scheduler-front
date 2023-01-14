import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getSingleLesson } from "../../store/actions";
import { FaPen } from "react-icons/fa";
import moment from "moment/moment";
import Modal from 'react-modal';
import { updateLessonDescription } from "../../store/actions";

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

    const [description, setDescription] = useState();

    useEffect(() => {
        if (jwt) {
            dispatch(getSingleLesson(lessonId));
        }
        if (lesson) {
            setDescription(lesson.description);
        }
    }, [jwt])

    const handleGoBack = () => {
        if (role === 'ADMIN') {
            return navigate('/admindashboard');
        }
        if (role === 'USER') {
            return navigate('/userdashboard');
        }
    }

    // Modal pop-up styles
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#8a729b26'
        },
      };
  
      Modal.setAppElement('#root');
  
      // It controls the modal display
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const handleEditing = () => {
        console.log("Editing has been submitted");
        dispatch(updateLessonDescription(description, lessonId));
        setModalIsOpen(false);
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
                        {role === 'ADMIN' &&
                            <FaPen className="lessoncard__description_edit_btn" onClick={() => setModalIsOpen(true)}></FaPen>
                        }
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

        <Modal
        isOpen={modalIsOpen}
        /* onAfterOpen={afterOpenModal} */
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Description edit modal">
            <div>
                <textarea
                            className="lessoncard__description_input"
                            type="text"
                            required={true}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            name="description"
                            rows={5}
                            cols={30}
                        />
            </div>
        <div className="timeslot__modal_btn_container">
          <button className="timeslot__confirm_btn" onClick={handleEditing}>confirm</button>
          <button className="timeslot__close_btn" onClick={() => setModalIsOpen(false)}>close</button>
        </div>
      </Modal>
    </>
  );
};

export default LessonDetailsCard;
