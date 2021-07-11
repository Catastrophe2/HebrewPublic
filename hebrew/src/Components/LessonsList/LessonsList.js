import { useEffect, useState } from "react";
import ListedLesson from "../ListedLesson/ListedLesson";
import "./LessonList.css";

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const goGet = async () => {
      let lessonslist = await fetch(`http://localhost:8000/:lessons`);
      let response = await lessonslist.json();
      return response;
    };
    let a = goGet();
    a.then((items) => {
      setLessons(items);
    });
  }, []);

  return (
    <div className="lessons-list">
      {lessons.map((lesson) => {
        return (
          <ListedLesson
            title={lesson.lessonTitle}
            desc={lesson.lessonDesc}
            lessonId={lesson.lessonId}
            key={lesson.lessonId}
          ></ListedLesson>
        );
      })}
    </div>
  );
};

export default LessonsList;

// let a = {
//   part_of_speech: "\u05e9\u05b5\u05dd \u05e0'",
//   synonyms: [],
//   samples: [],
//   translated: "\u05d4\u05b5\u05d7\u05b8\u05dc\u05b0\u05e6\u05d5\u05bc\u05ea",
//   translation: [
//     "extricating oneself",
//     "escaping",
//     "being taken off (footwear)",
//     "being removed",
//     "being extricated",
//     "being pulled out",
//     "volunteering",
//   ],
//   inflections: [],
//   id: "20906",
// };
