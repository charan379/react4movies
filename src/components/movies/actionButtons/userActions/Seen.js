import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle';

const Seen = ({ toast }) => {
    const { title, setTitle } = useTitle(); // Custom hook for managing title state
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const { movieBunkersAPI } = useMovieBunkersAPI(); // Custom hook for handling API requests

    // Function to add title to seen list
    const addToSeenTitles = async (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await movieBunkersAPI.post(`/userdata/add-to-seen/${base64TitleId}`);
            setTitle({ ...title, seenByUser: true, unseenByUser: false });
            // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true, delay: 50 })
        } catch (error) {
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? 'Something went wrong', { autoClose: 2000, position: 'top-right', closeButton: true });
        } finally {
            setIsLoading(false);
        }
    };

    // Function to add title to unseen list
    const addToUnseenTitles = async (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await movieBunkersAPI.post(`/userdata/add-to-unseen/${base64TitleId}`);
            setTitle({ ...title, unseenByUser: true, seenByUser: false });
            // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true, delay: 50 })
        } catch (error) {
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? 'Something went wrong', { autoClose: 2000, position: 'top-right', closeButton: true });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Button to mark title as unseen if already updated as seen*/}
            {title?.seenByUser && (
                <Link className="action-button" onClick={(event) => addToUnseenTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span /*style={{ color: 'rgba(16,125,172, 1)' }} */>
                        {isLoading ? (
                            <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                        ) : (
                            <i className="fas fa-eye fa-lg"></i>
                        )}
                    </span>
                </Link>
            )}

            {/* Button to mark title as seen if its already marked as unseen */}
            {title?.unseenByUser && (
                <Link className="action-button" onClick={(event) => addToSeenTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span /*style={{ color: 'rgba(16,125,172, 1)' }} */>
                        {isLoading ? (
                            <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                        ) : (
                            <i className="fas fa-eye-slash fa-lg"></i>
                        )}
                    </span>
                </Link>
            )}

            {/* Button to mark title as seen */}
            {!title?.unseenByUser && !title?.seenByUser && (
                <Link className="action-button" onClick={(event) => addToSeenTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>

                    {isLoading
                        ? (<span>
                            <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                        </span>)
                        : (<span style={{ opacity: '0.3' }}>
                            <i className="fas fa-eye fa-lg"></i>
                        </span>)
                    }
                </Link>
            )}
        </>
    )
}

export default Seen;