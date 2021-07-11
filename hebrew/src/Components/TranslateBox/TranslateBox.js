import fullstar from "./fullstar.png";
import emptystar from "./emptystar.png";
import { useEffect, useState } from "react";

const TranslateBox = (props) => {
  const [starStatus, setStarStatus] = useState(false);
  useEffect(() => {
    if (props.content[0]) {
      setStarStatus(props.content[0].samples[0]);
    }
  }, [props]);

  const addWord = async (word) => {
    const token = localStorage.getItem("token");
    if (starStatus === true) {
      setStarStatus(false);
    } else {
      setStarStatus(true);
    }
    await fetch("http://localhost:8000/user/addword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        token,
      }),
    });
  };

  if (props.content[0]) {
    return (
      <div>
        {starStatus ? (
          <img
            src={fullstar}
            alt=""
            className="star-img"
            onClick={() => addWord(props.content[0].inflections)}
          ></img>
        ) : (
          <img
            src={emptystar}
            alt=""
            className="star-img"
            onClick={() => addWord(props.content[0].inflections)}
          ></img>
        )}
        {props.content.map((definition) => {
          return (
            <div>
              <h3>{definition.translated}</h3>
              <ul>
                {definition.translation.map((def) => {
                  return <li key={def}>{def}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <h3>Click a word to see translation!</h3>
    </div>
  );
};

export default TranslateBox;
