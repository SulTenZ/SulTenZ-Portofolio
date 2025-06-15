// src/components/Input.jsx
function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "font-dmsans px-4 py-2 rounded bg-[#232323] border border-secondary text-white focus:outline-none focus:ring-2 focus:ring-main transition " +
        className
      }
      {...props}
    />
  );
}
export default Input;
