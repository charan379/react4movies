import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle';

const Star = ({ toast }) => {
    // Use custom hooks to get the title and update it
    const { title, setTitle } = useTitle();
    const { movieBunkersAPI } = useMovieBunkersAPI();

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
            // Update the title state to reflect that the title is now starred by the user
            setTitle({ ...title, starredByUser: true });
            // Display a success toast message
            // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true, delay: 50 });
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
            // Update the title state to reflect that the title is no longer starred by the user
            setTitle({ ...title, starredByUser: false });
            // Display a success toast message
            // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true, delay: 50 });
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
            {title?.starredByUser && (
                <Link className="action-button" onClick={(event) => removeFromStarredTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    {/* Display a loading spinner if the button is in a loading state */}
                    {isLoading
                        ? <span><i class="fas fa-circle-notch fa-pulse fa-lg"></i></span>
                        : <span style={{ color: "rgba(255, 172, 0, 1)" }}>
                            <i className="fas fa-star fa-lg"></i>
                        </span>
                    }
                </Link>
            )}

            {/* Display a button to add this title to  starred titles */}
            {!title?.starredByUser && (
                <Link className="action-button" onClick={(event) => addToStarredTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
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