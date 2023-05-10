import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMoviebunkersAPI } from 'hooks';

const Star = ({ toast, className = 'action-button', titleId = null, starredByUser = false }) => {

    const [isStarred, setStarred] = useState(starredByUser);

    const { movieBunkersAPI } = useMoviebunkersAPI();

    // State to keep track of whether the button is in a loading state or not
    const [isLoading, setIsLoading] = useState(false);

    // Function to add a title to the user's starred titles
    const addToStarredTitles = async (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Send a request to the API to add the title to the user's starred titles
            const response = await movieBunkersAPI.post(
                `/userdata/add-to-starred/${base64TitleId}`
            );
            // Update the state to reflect that the title is now starred by the user
            setStarred(true);
        } catch (error) {
            // If there was an error, display an error toast message
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? 'Somthing went wrong', {
                autoClose: 2000,
                position: 'top-right',
                closeButton: true,
            });
        } finally {
            // Set the loading state back to false
            setIsLoading(false);
        }
    };

    // Function to remove a title from the user's starred titles
    const removeFromStarredTitles = async (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Send a request to the API to remove the title from the user's starred titles
            const response = await movieBunkersAPI.post(
                `/userdata/remove-from-starred/${base64TitleId}`
            );
            // Update the state to reflect that the title is no longer starred by the user
            setStarred(false);
        } catch (error) {
            // If there was an error, display an error toast message
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? 'Somthing went wrong', {
                autoClose: 2000,
                position: 'top-right',
                closeButton: true,
            });
        } finally {
            // Set the loading state back to false
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* If the title is already starred by the user, display a button to remove it from their starred titles */}
            {isStarred && (
                <Link className="action-button" onClick={(event) => removeFromStarredTitles(event, btoa(titleId).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}
                    data-tooltip={`Remove from starred`} data-flow="up">
                    {/* Display a loading spinner if the button is in a loading state */}
                    {isLoading
                        ? <span><i class="fas fa-circle-notch fa-pulse fa-lg"></i></span>
                        : <span style={{ color: "rgb(255 149 0)" }}>
                            <i className="fas fa-star fa-lg"></i>
                        </span>
                    }
                </Link>
            )}

            {/* Display a button to add this title to  starred titles */}
            {!isStarred && (
                <Link className="action-button" onClick={(event) => addToStarredTitles(event, btoa(titleId).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}
                    data-tooltip={`Mark as starred`} data-flow="up">
                    <span>
                        {/* Display a loading spinner if the button is in a loading state */}
                        {isLoading
                            ? <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                            : <i className="far fa-star fa-lg"></i>}
                    </span>
                </Link>
            )}
        </>


    )
}

export default Star