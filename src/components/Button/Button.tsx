import React from "react";
import { ButtonProps } from "@/types/types";
import { Oval } from "react-loader-spinner";

const Button = ({ children, className, onClick, disabled }: ButtonProps) => {
    return (
        <button
            className={`
        ${disabled ? "opacity-75 cursor-not-allowed" : ""}
        inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 bg-black rounded-lg hover:opacity-75 focus:shadow-outline focus:outline-none ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {disabled ? <Oval
                height={16}
                width={16}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fff"
                strokeWidth={2}
                strokeWidthSecondary={2}

            /> : children}
        </button>
    );
};

export default Button;