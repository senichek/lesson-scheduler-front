import teacher from "./teacher.jpg";
import './style.scss';

const About = () => {
  return (
  <div className="about_container">
        <img src={teacher} alt="Teacher new the board" className="about__photo"/>
        <div className="about__info">
            <h1 className="about__header">Welcome to Lesson Booking application!</h1>
            <p className="about__main_text">The website is designed for students to book (reserve) the time 
            slots for private lessons. The website supports only one teacher (one admin) with multiple students. 
            The teacher (admin) can create (open) time slots and the users (students) can book them (one slot per user). 
            The teacher can also add and modify the description of each time slot (lesson). The students can modify their 
            profile information</p>
            <div className="about__repos">
                <p>Backend repository: <a href="https://github.com/senichek/lesson-scheduler/tree/dev">https://github.com/senichek/lesson-scheduler/tree/dev</a></p>
                <p>Frontend repository: <a href="https://github.com/senichek/lesson-scheduler-front/tree/dev">https://github.com/senichek/lesson-scheduler-front/tree/dev</a></p>
            </div>
        </div>
  </div>
  )
  ;
};

export default About;
