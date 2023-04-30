import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTitle, useMoviebunkersAPI, useSeasonsUpdater } from 'hooks';

const AddTitle = ({ toast }) => {
    // Get the title from the custom hook
    const { title } = useTitle();

    // Get the API instance from the custom hook
    const { movieBunkersAPI } = useMoviebunkersAPI();

    // Update Tv Show Seasons and episodes hook
    const { updateSeasons } = useSeasonsUpdater();

    // Set the loading state
    const [isLoading, setIsLoading] = useState(false);

    // Function to add a new title
    const addTitle = async (event, title) => {
        // Prevent the default form submission
        event.preventDefault();

        // Set the loading state to true
        setIsLoading(true);

        try {
            // Make the API request to add the new title
            const { data: { message, title: newTitle } } = await movieBunkersAPI.post(`/titles/new`, { ...title });

            // If title_type is tv then add tv show seasons and its corresponding episodes 
            await updateSeasons({ tmdbTvId: newTitle?.tmdb_id, moviebunkersTitleId: newTitle?._id, numberOfSeasons: newTitle?.number_of_seasons })

            // Show a success toast with the response message
            toast.success(message, {
                autoClose: 1000,
                position: "top-left",
                closeButton: true
            });
        } catch (error) {
            // If there is an error, show an error toast with the error message
            const errMsg = error?.response?.data?.error?.message;
            toast.error(errMsg ?? "Something went wrong", {
                autoClose: 2000,
                position: "top-right",
                closeButton: true
            });
        } finally {
            // Set the loading state back to false, whether the request succeeds or fails
            setIsLoading(false);
        }
    };

    return (
        // Render a Link component as a button to add the title
        <Link
            className="action-button"
            onClick={(event) => addTitle(event, title)}>

            {/* Show a loading spinner and "Adding..." text while the request is in progress */}
            {isLoading
                ? <span> <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                    Adding....
                </span>
                // Show the regular "Add to collection" button when the request is not in progress
                : <span>
                    <i className="fas fa-cloud-download-alt fa-lg"></i>
                    Add to collection
                </span>
            }
        </Link>
    );
};

export default AddTitle;
