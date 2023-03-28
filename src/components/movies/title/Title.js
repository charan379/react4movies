import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchTmdbTitle } from '../../../helpers/tmdb.requests';
import useAuth from '../../../utils/hooks/useAuth';
import useMovieBunkersAPI from '../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../utils/hooks/useTitle';
import useToastify from '../../../utils/hooks/useToast';
import Loader from '../../utils/Loader';
import Movie from './titleTypes/Movie';
import Tv from './titleTypes/Tv';

const Title = ({ id, titleState, titleType }) => {
    const {
        _id = id,
        _titleState = titleState,
        _titleType = titleType,
    } = useParams();

    const { title, setTitle, flushTitle } = useTitle();

    const { removeAuth } = useAuth();

    const { movieBunkersAPI } = useMovieBunkersAPI();

    const [errors, setErrors] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const { ToastContainer, toastContainerOptions, toast } = useToastify();

    const fetchMoviebunkersTitle = ({ id, cancelToken }) => {
        movieBunkersAPI.get(`/titles/id/${id}`, { cancelToken: cancelToken })
            .then((response) => {
                setTitle({ ...response?.data, state: _titleState })
            }).catch((error) => {
                if (axios.isCancel(error)) {
                    console.log("Request Cancelled");
                    return 0;
                };
                const message = error?.response?.data?.error?.message ?? error?.message ?? "Something went wrong";
                setErrors(message);
                toast.error(message, { autoClose: 2000, position: "top-right" })
                if (message.includes("Please")) {
                    removeAuth();
                }
            }).finally(() => {
                setIsLoading(isLoading => !isLoading);
            })
    }

    const fetchData = ({ _id, _titleType, _titleState, cancelToken }) => {
        switch (_titleState) {
            case "tmdb": fetchTmdbTitle({ id: _id, titleType: _titleType, cancelToken })
                .then((result) => {
                    setTitle({ ...result, state: _titleState })
                    setIsLoading(isLoading => !isLoading);
                })
                .catch((error) => {
                    toast.error(error?.message ?? "Something Went Wrong", { autoClose: 3000, position: "top-right" })
                    setErrors(error)
                    setIsLoading(isLoading => !isLoading);
                }, 500);
                break;

            case "moviebunkers": fetchMoviebunkersTitle({ id: _id, cancelToken })
                break;
            default: return 0;
        }
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        flushTitle();
        setIsLoading(isLoading => !isLoading);
        setErrors("");
        setTimeout(() => {
            fetchData({ _id, _titleType, _titleState, cancelToken: source.token })
        });

        return () => {
            source.cancel();
        }
        // eslint-disable-next-line 
    }, [_id, _titleState, _titleType])

    return (
        <>
            {isLoading ? <Loader /> : null}

            {(Object.keys(title).length === 0) ? <Loader /> : null}

            {title?.title_type === "movie" ? <Movie movie={{ ...title }} /> : null}

            {title?.title_type === "tv" ? <Tv /> : null}

            {errors
                ?
                <>
                    <div className={"error-message"}>
                        {errors?.message ?? "No Results Found"}
                    </div>
                </>
                :
                null}

            <ToastContainer {...toastContainerOptions} />
        </>
    )
}

export default Title;