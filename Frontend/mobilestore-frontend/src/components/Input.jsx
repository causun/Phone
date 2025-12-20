function Input({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className
}) {
  return (
    <input
      name={name}                 // ⭐ QUAN TRỌNG NHẤT
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field ${className || ""}`}
    />
  );
}

export default Input;
