import "./ListedWord.css";

const ListedWord = (props) => {
  return (
    <div className="listedWord">
      <p>{props.word}</p>
      {props.trans &&
        props.trans.map((definition) => {
          return <p>{definition.translation}</p>;
        })}
    </div>
  );
};

export default ListedWord;
