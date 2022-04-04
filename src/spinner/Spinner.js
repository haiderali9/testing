import React from 'react';

function Spinner() {
    return (
        <div className="spinner-main d-flex justify-content-center">
            <div
                className="spinner-circle spinner-border text-info"
                role="status"
            >
                <span className="visually-hidden" />
            </div>
        </div>
    );
}

export default Spinner;
