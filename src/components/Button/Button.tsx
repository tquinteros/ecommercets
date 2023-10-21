import React from "react";
import { ButtonProps } from "@/types/types";

const Button = ({ children, className, onClick, disabled }: ButtonProps) => {
    return (
        <button
        className={`inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 bg-black rounded-lg hover:opacity-75 focus:shadow-outline focus:outline-none ${className}`}
        onClick={onClick}
        disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;