const Message = ({ variant, children }) => {
  const baseClass = "px-4 py-3 rounded shadow mb-4";
  const variantClasses = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return <div className={`${baseClass} ${variantClasses[variant] || variantClasses.info}`}>{children}</div>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
