// src/components/Form.jsx
function Form({ children, className = "", ...props }) {
  return (
    <form className={"space-y-4 " + className} {...props}>
      {children}
    </form>
  );
}
export default Form;
