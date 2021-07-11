import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TextRead from "../TextRead/TextRead";
import TranslateBox from "../TranslateBox/TranslateBox";
import "./LessonContent.css";

const LessonContent = (props) => {
  const [transRequest, setTransRequest] = useState({
    translated: "",
    translation: "",
    doesExist: false,
  });
  const [lessonCont, setLessonCont] = useState([]);

  let lessonId = useParams();
  lessonId = lessonId.lessonId.slice(1);

  useEffect(() => {
    const getLesson = async () => {
      let lessonData = await fetch(
        `http://localhost:8000/lessonNum/:${lessonId}`
      );
      let c = await lessonData.json();
      setLessonCont(c);
    };
    getLesson();
  }, [lessonId]);

  if (lessonCont.length > 0) {
    return (
      <div className="lesson-content">
        <div className="trans-box">
          <TranslateBox
            content={transRequest}
            className="trans-box"
          ></TranslateBox>
        </div>
        <div className="lesson-header">
          <h2>{lessonCont[0].lessonTitle}</h2>
        </div>
        {lessonCont[0].content.map((element) => {
          if (!element.lessonTitle) {
            if (element.lang === "eng") {
              return <div className="lesson-text-1">{element.text}</div>;
            }
            return (
              <TextRead
                setTransRequest={setTransRequest}
                className="heb-text"
                text={element.text}
              ></TextRead>
            );
          }
        })}
      </div>
    );
  }
  return <div></div>;
};

export default LessonContent;
