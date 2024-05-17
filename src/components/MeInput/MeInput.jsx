import "./MeInput.css"

export const MeInput = ({
  type,
  name,
  placeholder,
  value,

}) => {
  // props, properties, propiedades, se reciben como un objeto
  return (
      <input className={"InputDesign"}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      >
      </input>
  );
};