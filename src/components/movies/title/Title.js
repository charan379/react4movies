import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import useMoviebunkersAPI from 'hooks/useMoviebunkersAPI';
import useTitle from 'hooks/useTitle';
import useToastify from 'hooks/useToast';
import Movie from './titleTypes/Movie';
import Tv from './titleTypes/Tv';
import useTmdbAPI from 'hooks/useTmdbAPI';
import { Loader } from 'components/common';

const Title = ({ id, titleState, titleType }) => {
    const {
        _id = id,
        _titleState = titleState,
        _titleType = titleType,
    } = useParams(); // Extracts the URL parameters using the useParams() hook

    const { title, setTitle, flushTitle } = useTitle(); // Gets the title state and related functions using the useTitle() custom hook

    const { removeAuth } = useAuth(); // Gets the removeAuth() function using the useAuth() custom hook

    const { movieBunkersAPI } = useMoviebunkersAPI(); // Gets the movieBunkersAPI object using the useMovieBunkersAPI() custom hook

    const { tmdbAPI } = useTmdbAPI(); // Gets the tmdbAPI object using the useTmdbAPI() custom hook

    const [errors, setErrors] = useState(); // Initializes a state variable to store error messages

    const [isLoading, setIsLoading] = useState(false); // Initializes a state variable to keep track of the loading state

    const { ToastContainer, toastContainerOptions, toast } = useToastify(); // Gets the react-toastify releated objects and functions using the useToastify() custom hook


    // Define the fetchMoviebunkersTitle function to fetch title data from the MovieBunkers API
    const fetchMoviebunkersTitle = async ({ id, cancelToken }) => {
        try {
            // Send GET request to movieBunkersAPI with provided id and cancelToken
            const response = await movieBunkersAPI.get(`/titles/id/${id}`, { cancelToken: cancelToken });

            // If successful, set the title state with the response data and _titleState
            setTitle({ ...response?.data, state: _titleState });
        } catch (error) {
            // Check if error is caused by a cancelled request
            if (axios.isCancel(error)) {
                console.log("Request Cancelled");
                return 0;
            }

            // If error is not a cancelled request, display error message and handle any authorization errors
            const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
            setErrors(message);
            toast.error(message, { autoClose: 2000, position: "top-right" });
            if (message.includes("Please")) {
                removeAuth();
            }
        }
    }

    // Define the fetchTmdbTitle function to fetch title data from the TMDB API
    const fetchTmdbTitle = async ({ id, titleType, cancelToken }) => {
        try {
            // Send GET request to tmdbAPI with provided id and cancelToken
            const response = await tmdbAPI.get(`/${titleType}/${id}`, { cancelToken: cancelToken });

            // If successful, set the title state with the response data and _titleState
            setTitle({ ...response?.data, state: _titleState });
        } catch (error) {
            // Check if error is caused by a cancelled request
            if (axios.isCancel(error)) {
                console.log("Request Cancelled");
                return 0;
            }

            // If error is not a cancelled request, display error message and handle any
            const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
            setErrors(message);
            toast.error(message, { autoClose: 2000, position: "top-right" });
        }
    }

    /**
     * Fetches data based on the given parameters.
     * @param {string} _id - The ID of the title to fetch.
     * @param {string} _titleType - The type of the title to fetch.
     * @param {string} _titleState - The state of the title to fetch.
     * @param {object} cancelToken - The cancel token to use for the request.
     */
    const fetchData = async ({ _id, _titleType, _titleState, cancelToken }) => {
        try {
            switch (_titleState) {
                case "tmdb":
                    // Fetch the title from TMDB.
                    await fetchTmdbTitle({ id: _id, titleType: _titleType, cancelToken });
                    break;

                case "moviebunkers":
                    // Fetch the title from Moviebunkers.
                    await fetchMoviebunkersTitle({ id: _id, cancelToken });
                    break;

                default:
                    return 0;
            }
        } catch (error) {
            // Handle errors.
            if (axios.isCancel(error)) {
                console.log("Request Cancelled");
                return 0;
            }
            const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
            setErrors(message);
            toast.error(message, { autoClose: 2000, position: "top-right" });
        } finally {
            // Update the loading state.
            setIsLoading(false);
        }
    };


    useEffect(() => {
        // create a new cancel token source
        const source = axios.CancelToken.source();

        // clear any existing title and errors
        flushTitle();
        setErrors("");

        // set loading state to true
        setIsLoading(true);

        // wait for 100ms before fetching data to avoid multiple requests being sent too quickly
        setTimeout(() => {
            fetchData({ _id, _titleType, _titleState, cancelToken: source.token })
        }, 100);

        // cancel the request when the component unmounts
        return () => {
            source.cancel();
        }
        // eslint-disable-next-line 
    }, [_id, _titleState, _titleType])


    return (
        <>
            {/*If the data is still loading or if the title object is empty,
            show the loading spinner component.*/}
            {isLoading || Object.keys(title).length === 0 ? <Loader /> : null}

            {/*If the title is a movie, render the movie component.
            If the title is a tv show, render the tv component.*/}
            {title?.title_type === "movie" && <Movie movie={{ ...title }} />}
            {title?.title_type === "tv" && <Tv />}

            {/*If there are errors, render the error message.Otherwise, render nothing.*/}
            {errors && (
                <div className={"error-message"}>
                    {errors?.message ?? "No Results Found"}
                </div>
            )}

            {/*Render the toast container component to show notifications.F*/}
            <ToastContainer {...toastContainerOptions} />
        </>
    )
}

export default Title;