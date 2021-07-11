import { useEffect, useState } from "react";
import Mila from "../Mila/Mila";
import "./TextRead.css";

const TextRead = (props) => {
  const [translated, setTranslated] = useState();

  const heText = props.text;
  let heTextArray = heText.split(" ");

  useEffect(() => {
    const fetcher = async () => {
      let token = localStorage.getItem("token");
      if (translated) {
        let details = await fetch(
          `http://localhost:8000/trans/:${translated}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
            }),
          }
        );
        let response = await details.json();
        await props.setTransRequest(response);
      }
    };
    fetcher();
  }, [translated]);

  return (
    <div>
      <div className="rtl-read">
        {heTextArray.map((word, index) => {
          return (
            <>
              <Mila
                text={word}
                key={index}
                setTranslated={setTranslated}
              ></Mila>
              ⠀
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TextRead;
