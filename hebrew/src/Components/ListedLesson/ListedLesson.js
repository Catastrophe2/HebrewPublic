import { Link } from "react-router-dom";
import "../LessonsList/LessonList.css";

const ListedLesson = (props) => {
  return (
    <Link to={`/lessonNum/:${props.lessonId}`}>
      <div className="listed-lesson-box">
        <h3 className="lesson-title">{props.title}</h3>
        <h4 className="lesson-desc">{props.desc}</h4>
      </div>
    </Link>
  );
};
export default ListedLesson;
