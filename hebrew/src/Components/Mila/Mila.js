import "./Mila.css";

const Mila = (props) => {
  return (
    <>
      <span className="mila" onClick={() => props.setTranslated(props.text)}>
        {props.text}
      </span>
    </>
  );
};

export default Mila;
