import PropTypes from 'prop-types';
import moment from "moment/moment";
import { useSelector } from 'react-redux';
import './style.scss';
import { FaTrash, FaCheckCircle, FaBan } from "react-icons/fa";
import { cancelLesson, deleteLesson, reserveLesson } from '../../store/actions';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';

const TimeSlot = ({start, end, id, reserved}) => {

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

    const handleSlotReservation = (slotId) => {
      setIsOpen(false);
      console.log(`Reserving slot id ${slotId}`);
      dispatch(reserveLesson(slotId));
    }

    const handleSlotCancelation = (slotId) => {
      setCancelationModalIsOpen(false);
      console.log(`Canceling slot id ${slotId}`);
      dispatch(cancelLesson(slotId));
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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cancelationModalIsOpen, setCancelationModalIsOpen] = useState(false);

  return (
    <>
    {/* If the timeslot is reserved we mark it by adding the corresponding classname */}
    <div className={`timeslot ${reserved ? "reserved" : ""}`} id={id} >
      {/* Delete button is only available to Admins */}
      {role === '[ROLE_ADMIN]' &&
        <div className="timeslot__delete_btn"><FaTrash onClick={handleTimeSlotDelete} id={id} /></div>
      }
      {(role === '[ROLE_USER]' && !reserved) &&
        <div className="timeslot__reserve_btn"><FaCheckCircle onClick={() => setIsOpen(true)} id={id} /></div>
      }
      {(role === '[ROLE_USER]' && reserved) &&
        <div className="timeslot__reserve_btn"><FaBan onClick={() => setCancelationModalIsOpen(true)} id={id} /></div>
      }
        <div className="timeslot__date">{day}</div>
        <div className="timeslot__times">
            <div className="timeslot__from">{startTime}</div>
            <div className="timeslot__to">{endTime}</div>
        </div>
    </div>
    {/* Confirmation modal */}
    <Modal
        isOpen={modalIsOpen}
        /* onAfterOpen={afterOpenModal} */
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Reservation modal"
      >
        <div>Are you sure you want to book this slot?</div>
        <div className="timeslot__modal_btn_container">
          <button className="timeslot__confirm_btn" onClick={() => handleSlotReservation(id)}>confirm</button>
          <button className="timeslot__close_btn" onClick={() => setIsOpen(false)}>close</button>
        </div>
      </Modal>
      {/* Cancelation modal */}
      <Modal
        isOpen={cancelationModalIsOpen}
        /* onAfterOpen={afterOpenModal} */
        onRequestClose={() => setCancelationModalIsOpen(false)}
        style={customStyles}
        contentLabel="Cancelation modal"
      >
        <div>Are you sure you want to cancel this slot?</div>
        <div className="timeslot__modal_btn_container">
          <button className="timeslot__confirm_btn" onClick={() => handleSlotCancelation(id)}>confirm</button>
          <button className="timeslot__close_btn" onClick={() => setCancelationModalIsOpen(false)}>close</button>
        </div>
      </Modal>
    </>
  )
};

TimeSlot.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string
  };

export default TimeSlot;
