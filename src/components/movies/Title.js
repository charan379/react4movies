import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchTmdbTitle } from '../../helpers/tmdb.requests';
import useToastify from '../../utils/hooks/useToast';
import MovieBunkersException from '../../utils/MovieBunkersException';
import Loader from '../utils/Loader';
import Movie from './Movie';
import Tv from './Tv';

const Title = ({ id, titleSource, titleType, title }) => {

    const {
        _id = id,
        _titleSource = titleSource,
        _titleType = titleType,
        _title = title
    } = useParams();

    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [titleData, setTitleData] = useState({})
    const { ToastContainer, toastContainerOptions, toast } = useToastify();
    const fetchData = async (query, source) => {
        switch (query?._titleSource) {
            case "tmdb": await fetchTmdbTitle({ id: query?._id, titleType: query?._titleType }, source)
                .then((result) => setTitleData(titleData => { return { ...result } }))
                break;
            default: return 0;
        }
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        setIsLoading(isLoading => !isLoading);
        setErrors(null);
        setTitleData({});
        setTimeout(() => {
            fetchData({ _id, _titleType, _titleSource }, source).then((result) => {
                setIsLoading(isLoading => !isLoading)
            }).catch((error) => {
                console.error(error)
                if (error instanceof MovieBunkersException) {
                    setErrors(error);
                } else {
                    setErrors(error);
                }
                setIsLoading(isLoading => !isLoading);
            })
        }, 500);
    }, [_id, _titleSource, _titleType])


    if (isLoading) return <Loader />

    if (errors) {
        toast.error(errors?.message ?? "Something Went Wrong", { autoClose: 6000, position: "top-center" })
        return (
            <>
                <div className={"error-message"}>
                    {errors?.message ?? "No Results Found"}
                </div>
                <ToastContainer {...toastContainerOptions} />
            </>
        )
    }

    if (Object.keys(titleData).length === 0) return <Loader />

    return (
        <>
            {titleData?.title_type === "movie" ? <Movie movie={{ ...titleData }} /> : null}

            {titleData?.title_type === "tv" ? <Tv tv={titleData}></Tv> : null}

            {errors ? console.log(errors) : null}

            <ToastContainer {...toastContainerOptions} />
        </>
    )
}

export default Title;