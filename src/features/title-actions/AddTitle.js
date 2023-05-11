import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMoviebunkersAPI, useSeasonsUpdater, useTmdbAPI } from 'hooks';

const AddTitle = ({ toast, className = 'action-button', buttonText, loadingText, tooltipText, titleType, tmdbId }) => {

    // Get the API instance from the custom hook
    const { movieBunkersAPI } = useMoviebunkersAPI();

    // Get the TMDB API instance from the custom hook
    const { tmdbAPI } = useTmdbAPI();

    // Update Tv Show Seasons and episodes hook
    const { updateSeasons } = useSeasonsUpdater();

    // Set the loading state
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch title data from tmdb
    const fetchTmdbTitle = async ({ titleType, tmdbId }) => {
        try {
            const response = await tmdbAPI.get(`${titleType}/${tmdbId}`);
            return { ...response?.data };
        } catch (error) {
            // Handle errors properly
            console.error(`Error fetching tmdb title data: ${error?.response?.data?.error?.message ?? error?.message}`);
            return null;
        }
    }

    // Function to add a new title
    const addTitle = async (event, titleType, tmdbId) => {
        // Prevent the default form submission
        event.preventDefault();

        // Set the loading state to true
        setIsLoading(true);

        try {
            const title = await fetchTmdbTitle({ titleType, tmdbId });

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
            className={className}
            onClick={(event) => addTitle(event, titleType, tmdbId)}
            data-tooltip={tooltipText} data-flow={`up`}
        >

            {/* Show a loading spinner and "Adding..." text while the request is in progress */}
            {isLoading
                ? <span> <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                    {loadingText}
                </span>
                // Show the regular "Add to collection" button when the request is not in progress
                : <span>
                    <i className="fas fa-cloud-download-alt fa-lg"></i>
                    {buttonText}
                </span>
            }
        </Link>
    );
};

export default AddTitle;
