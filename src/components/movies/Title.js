import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchTitle } from '../../helpers/moviebunkers.requests';
import { fetchTmdbTitle } from '../../helpers/tmdb.requests';
import useTitle from '../../utils/hooks/useTitle';
import useToastify from '../../utils/hooks/useToast';
import Loader from '../utils/Loader';
import Movie from './Movie';
import Tv from './Tv';

const Title = ({ id, titleState, titleType }) => {
    console.log(titleState)
    const {
        _id = id,
        _titleState = titleState,
        _titleType = titleType,
    } = useParams();

    const { title, setTitle, flushTitle } = useTitle();

    const [errors, setErrors] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const { ToastContainer, toastContainerOptions, toast } = useToastify();

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

            case "moviebunkers": fetchTitle({ id: _id, cancelToken })
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
            default: return 0;
        }
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        flushTitle();
        setIsLoading(isLoading => !isLoading);
        setErrors("");
        setTimeout(() => {
            console.log({ _id, _titleType, _titleState, cancelToken: source.token })
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

            {title?.title_type === "tv" ? <Tv tv={{ ...title }}></Tv> : null}

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