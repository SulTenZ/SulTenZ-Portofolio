// src/components/Button.jsx
function Button({ children, className = "", ...props }) {
  return (
    <button
      className={
        "font-jakarta px-5 py-2 rounded-lg bg-main text-background font-bold hover:bg-secondary hover:text-main transition " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
