import React from 'react';

export default function MyInputField({
    name,
    register,
    errors,
    label,
    className = '',
    placeholder,
    required,
    ...rest
}) {
    return (
        <div className="form-group  ">
            {label && <label htmlFor="input-field">{label}</label>}
            <br />

            <input
                {...register(name, {
                    required: required || 'Required Fields Cannot Be Empty!'
                })}
                name={name}
                className={className}
                placeholder={placeholder}
                {...rest}
            />
            {errors && (
                <span className="input-error-highlight">{errors.message}</span>
            )}
        </div>
    );
}
