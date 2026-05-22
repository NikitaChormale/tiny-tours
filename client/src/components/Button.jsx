import React from "react";

function Button({
  title,
  size = "md",
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}) {

  const sizeClasses = {
    xsm: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-300",

    secondary:
      "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300",

    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",

    success:
      "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        
        rounded-xl
        font-semibold
        shadow-md
        transition-all
        duration-200
        focus:outline-none
        focus:ring-4
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    >
      {title}
    </button>
  );
}

export default Button;