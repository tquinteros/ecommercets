import React from "react";
import { InputProps } from "@/types/types";

export const Input = ({ label, value, onChange, type, placeholder, className }: InputProps) => {
    return (
        <label className="flex flex-col gap-1">
            {label}:
            <input
                value={value}
                onChange={onChange}
                type={type}
                className={`${className} py-1 border border-black px-2 rounded-md`}
                placeholder={placeholder}
            />
        </label>
    );
};

export default Input;