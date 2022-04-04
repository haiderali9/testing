import React from 'react';

export default function CheckInputField({name, register, label}) {
    return (
        <div className="form-check">
            <input
                {...register(name)}
                name={name}
                className="form-check-input"
                type="checkbox"
                id={name}
            />
            <label className="form-check-label" htmlFor="name">
                {label}
            </label>
        </div>
    );
}
