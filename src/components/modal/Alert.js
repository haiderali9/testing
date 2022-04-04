import React from 'react';

function Alert({
    onSuccess,
    onCancel,
    isVisible,
    title,
    subTitle,
    onSuccessLabel,
    onRejectLabel,
    className = ''
}) {
    return !isVisible ? null : (
        <div>
            <div
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                {title}
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onCancel}
                            />
                        </div>
                        <div className="modal-body">
                            <p>{subTitle}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className={className}
                                data-bs-dismiss="modal"
                                onClick={onSuccess}
                            >
                                {onSuccessLabel}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onCancel}
                            >
                                {onRejectLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;
