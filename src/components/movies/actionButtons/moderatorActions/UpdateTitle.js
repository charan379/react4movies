import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle'
import useTmdbAPI from '../../../../utils/hooks/useTmdbAPI';
import useSeasonsUpdater from '../../../../utils/hooks/useSeasonsUpdater';

const UpdateTitle = ({ toast }) => {

    // Get the current title and its setter function from the global state
    const { title, setTitle } = useTitle();

    // Get the TMDB API instance from the custom hook
    const { tmdbAPI } = useTmdbAPI();

    // Get the MovieBunkers API instance from the custom hook
    const { movieBunkersAPI } = useMovieBunkersAPI();

    // Update Tv Show Seasons and episodes hook
    const { updateSeasons } = useSeasonsUpdater();


    // State to hold the TMDB title data
    const [tmdbTitle, setTmdbTitle] = useState(null);

    // State to hold the loading state of the button
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch title data from tmdb
    const fetchTmdbTitle = async (cancelToken) => {
        try {
            const response = await tmdbAPI.get(`${title?.title_type}/${title?.tmdb_id}`, { cancelToken });
            setTmdbTitle({ ...response?.data });
        } catch (error) {
            // Handle errors properly
            console.error(`Error fetching tmdb title data: ${error?.response?.data?.error?.message ?? error?.message}`);
            setTmdbTitle(null);
        }
    }


    // Function to handle the title update/sync
    const updateTitle = async (event, titleId) => {
        event.preventDefault();
        // set loading state to true
        setIsLoading(true);

        // If TMDB title data is available, update the title on the server
        if (tmdbTitle) {
            try {
                // update title on server
                const { data: { message, title: updatedTitle } } = await movieBunkersAPI.put(`/titles/update/id/${titleId}`, tmdbTitle);
                console.log(message)
                // asign updated title to redux reducer
                setTitle({ ...updatedTitle });
                // if title_type is `tv` then update seasons and episodes
                if (updatedTitle?.title_type === 'tv') {
                    await updateSeasons({ tmdbTvId: updatedTitle?.tmdb_id, moviebunkersTitleId: updatedTitle?._id, numberOfSeasons: updatedTitle?.number_of_seasons })
                }
                // toast success message
                toast.success(message, { autoClose: 1000, position: "top-left", closeButton: true });
            } catch (error) {
                // Handle errors properly
                const errMsg = error?.response?.data?.error?.message
                // toast error message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true })
            } finally {
                // update loading state to false
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
            // toast error message
            toast.error("Failed to retrieve data from TMDB ", { autoClose: 2000, position: "top-right", closeButton: true });
        }
    }

    // Fetch the TMDB title data on mount
    useEffect(() => {
        const source = axios.CancelToken.source();
        fetchTmdbTitle(source.token);
        return () => {
            source.cancel()
        }
    }, [])

    return (
        <Link
            className="action-button"
            // Disable the button if TMDB title data is not available
            style={{ pointerEvents: `${tmdbTitle ? 'all' : 'none'}`, cursor: `${tmdbTitle ? 'pointer' : 'not-allowed'}`, opacity: `${tmdbTitle ? 1 : 0.5}` }}
            // Call the updateTitle function when the button is clicked
            onClick={(event) => updateTitle(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>

            {isLoading
                ? <span>
                    <i class="fas fa-sync-alt fa-pulse fa-lg"></i>
                    Updating....
                </span>
                : <span>
                    <i className="fas fa-sync-alt fa-lg" ></i>
                    Update/Sync
                </span>
            }
        </Link>
    )
}

export default UpdateTitle
