import React, { useId } from "react";

// forwardRef hook is used to forward the ref to the input element
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref // The ref is passed as a second argument
) {
  // We can use the useId hook to generate a unique id for the input element
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref} // Forward the ref to the input element
        {...props} // Spread additional props provided to the Input component
        id={id} // Assign the id to the input element
      />
    </div>
  );
});

export default Input;
