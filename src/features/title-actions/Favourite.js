import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMoviebunkersAPI } from 'hooks';

const Favourite = ({ toast, className = 'action-button', titleId = null, favouriteByUser = false }) => {


    const [isFavourite, setFavourite] = useState(favouriteByUser);

    // Custom hook to manage API requests
    const { movieBunkersAPI } = useMoviebunkersAPI();

    const [isLoading, setIsLoading] = useState(false);

    // Add the current title to the user's favourite titles
    const addToFavouriteTitles = async (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await movieBunkersAPI.post(`/userdata/add-to-favourite/${base64TitleId}`);
            setFavourite(true);
        } catch (error) {
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? "Something went wrong", { autoClose: 2000, position: "top-right", closeButton: true, delay: 50 });
        } finally {
            setIsLoading(false);
        }
    }

    // Remove the current title from the user's favourite titles
    const removeFromFavouriteTitles = async (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await movieBunkersAPI.post(`/userdata/remove-from-favourite/${base64TitleId}`);
            setFavourite(false);
        } catch (error) {
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? "Something went wrong", { autoClose: 2000, position: "top-right", closeButton: true });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isFavourite && (
                <Link className={className} onClick={(event) => removeFromFavouriteTitles(event, btoa(titleId).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}
                    data-tooltip={`Remove from favourite's`} data-flow="up">
                    {isLoading
                        ? <span> <i class="fas fa-circle-notch fa-pulse fa-lg"></i> </span>
                        : <span style={{ color: "rgba(255, 20, 70, 1)" }}>
                            <i className="fas fa-heart fa-lg"></i>
                        </span>
                    }

                </Link>
            )}

            {!isFavourite && (
                <Link className={className} onClick={(event) => addToFavouriteTitles(event, btoa(titleId).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}
                    data-tooltip={`Mark as favourite`} data-flow="up">
                    <span>
                        {isLoading
                            ? <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                            : <i className="far fa-heart fa-lg"></i>
                        }
                    </span>
                </Link>
            )}
        </>
    )
}

export default Favourite;