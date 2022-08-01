import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const icons = {
    facebook: 'fab fa-facebook',
    google: 'fab fa-google',
    googlePlus: 'fab fa-google-plus'
};
//comment
const AppButton = ({
    children,
    isLoading,
    icon,
    theme = 'primary',
    disabled,
    ...otherProps
}) => {
    let spinnerTemplate;
    let iconTemplate;

    if (isLoading) {
        spinnerTemplate = (
            <Spinner
                className="ml-2"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        );
    }

    if (icon && icons[icon]) {
        iconTemplate = <i className={`${icons[icon]} mr-2`} />;
    }

    return (
        <Button
            {...otherProps}
            variant={theme}
            disabled={isLoading || disabled}
        >
            {iconTemplate}
            {children}
            {spinnerTemplate}
        </Button>
    );
};

export default AppButton;
