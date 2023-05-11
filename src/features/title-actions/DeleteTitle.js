import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMoviebunkersAPI } from 'hooks';

const DeleteTitle = ({ toast, className = 'action-button', buttonText, loadingText, tooltipText, titleId }) => {
    const location = useLocation(); // retrieve current location from React Router

    const { movieBunkersAPI } = useMoviebunkersAPI(); // get an instance of the API

    const [isLoading, setIsLoading] = useState(false); // state for loading indicator

    const deleteTitle = async (event, titleId) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // make API request to delete title
            const response = await movieBunkersAPI.delete(`/titles/delete/id/${titleId}`);
            const message = response?.data?.message ?? 'Title deleted successfully';
            toast.success(message, { autoClose: 1000, position: 'top-left', closeButton: true });

            // wait for 1 second before closing window or modal
            setTimeout(() => {
                if (/^\/view.{0,}/.test(location.pathname)) {
                    window.close(); // close the window if we're in title page
                } else {
                    const closeBtn = document.getElementsByClassName('closeBtn')[0];
                    const clickEvent = new MouseEvent('click', { bubbles: true });
                    closeBtn.dispatchEvent(clickEvent); // click the close button if we're in a modal
                }
            }, 1000);
        } catch (error) {
            const errMsg = error?.response?.data?.error?.message ?? 'Something went wrong';
            toast.error(errMsg, { autoClose: 2000, position: 'top-right', closeButton: true });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Link
            className={className}
            onClick={(event) =>
                deleteTitle(event, btoa(titleId).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))
            }
            data-tooltip={tooltipText} data-flow={`up`}
        >
            {isLoading ? (
                <span>
                    <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                    {loadingText}
                </span>
            ) : (
                <span>
                    <i className="fas fa-trash-alt fa-lg"></i>
                    {buttonText}
                </span>
            )}
        </Link>
    );
};

export default DeleteTitle;
