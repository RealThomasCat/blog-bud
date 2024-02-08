import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {
          /* Options */
          /* Only render options if not empty or else app will crash */
          options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))
        }
      </select>
    </div>
  );
}

// Easier syntax for using forwardRef
export default React.forwardRef(Select);
