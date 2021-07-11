import { useEffect, useState } from "react";
import ListedWord from "../../ListedWord/ListedWord";

const SavedWords = () => {
  const token = localStorage.getItem("token");
  const [wordsList, setWordsList] = useState([]);

  useEffect(() => {
    const goGet = async () => {
      let lessonslist = await fetch("http://localhost:8000/user/savedwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
        }),
      });
      let response = await lessonslist.json();
      return response;
    };
    let a = goGet();
    a.then((items) => {
      setWordsList(items);
    });
  }, []);

  return (
    <div>
      <h3>Saved Words</h3>
      <button onClick={() => console.log(wordsList)}></button>
      {wordsList.data ? (
        <div>
          {wordsList.data.map((word, index) => {
            {
              return (
                <ListedWord
                  word={word}
                  trans={wordsList.translations[index]}
                ></ListedWord>
              );
            }
          })}
        </div>
      ) : (
        <div>nothing here</div>
      )}
    </div>
  );
};

export default SavedWords;
