import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchTmdbTitle } from '../../helpers/tmdb.requests';
import useToastify from '../../utils/hooks/useToast';
import Loader from '../utils/Loader';
import Movie from './Movie';
import Tv from './Tv';

const Title = ({ id, titleSource, titleType, title }) => {

    const {
        _id = id,
        _titleSource = titleSource,
        _titleType = titleType,
    } = useParams();

    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [titleData, setTitleData] = useState({})
    const { ToastContainer, toastContainerOptions, toast } = useToastify();

    const fetchData = async ({_id, _titleType, _titleSource, cancelToken}) => {
        switch (_titleSource) {
            case "tmdb": return await fetchTmdbTitle({ id: _id, titleType: _titleType, cancelToken });
            default: return 0;
        }
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        setIsLoading(isLoading => !isLoading);
        setTitleData({});
        setTimeout(() => {
            fetchData({ _id, _titleType, _titleSource, cancelToken: source.token })
                .then((result) => {
                    setErrors("");
                    setTitleData({ ...result });
                    setIsLoading(isLoading => !isLoading);
                })
                .catch((error) => {
                    toast.error(error?.message ?? "Something Went Wrong", { autoClose: 3000, position: "top-right" })
                    setErrors(error)
                    setIsLoading(isLoading => !isLoading);
                })
        }, 500);

        return () => {
            source.cancel();
        }
        // eslint-disable-next-line 
    }, [_id, _titleSource, _titleType])

    return (
        <>

            {isLoading ? <Loader /> : null}

            {(Object.keys(titleData).length === 0) ? <Loader /> : null}

            {titleData?.title_type === "movie" ? <Movie movie={{ ...titleData }} /> : null}

            {titleData?.title_type === "tv" ? <Tv tv={titleData}></Tv> : null}

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