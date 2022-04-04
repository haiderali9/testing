import React from 'react';
import Select from 'react-select';
import {Controller} from 'react-hook-form';

const SelectComponent = ({
    defaultText = '',
    options,
    name,
    label,
    control,
    isMulti
}) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={defaultText}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={{required: true}}
                render={({
                    field: {onChange, onBlur, value, name: Name, ref},
                    fieldState: {error}
                }) => (
                    <>
                        <Select
                            isMulti={isMulti}
                            ref={ref}
                            name={Name}
                            onBlur={onBlur}
                            onChange={(val) =>
                                onChange(isMulti ? [...val] : val.value)
                            }
                            value={
                                isMulti
                                    ? value
                                    : options.find((c) => c.value === value) ||
                                      null
                            }
                            placeholder={defaultText}
                            options={options}
                        />
                        {error && (
                            <span className="input-error-highlight">
                                {error.message}
                            </span>
                        )}
                    </>
                )}
            />
        </div>
    );
};
export default SelectComponent;
