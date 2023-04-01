import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle'
import useTmdbAPI from '../../../../utils/hooks/useTmdbAPI';

const UpdateTitle = ({ toast }) => {

    const { title, setTitle } = useTitle();

    const { tmdbAPI } = useTmdbAPI();

    const { movieBunkersAPI } = useMovieBunkersAPI();

    const [tmdbTitle, setTmdbTitle] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const fetchTmdbTitle = (cancelToken) => {
        tmdbAPI.get(`${title?.title_type}/${title?.tmdb_id}`, { cancelToken: cancelToken })
            .then((response) => {
                setTmdbTitle({ ...response?.data });
            }).catch(() => {
                setTmdbTitle(null);
            })
    }

    const updateTitle = (event, titleId) => {
        event.preventDefault();
        setIsLoading(true);
        if (tmdbTitle) {
            movieBunkersAPI.put(`/titles/update/id/${titleId}`, tmdbTitle)
                .then((response) => {
                    setTitle({ ...response?.data?.title });
                    toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true })
                })
                .catch((error) => {
                    const errMsg = error?.response?.data?.error?.message
                    toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true })
                }).finally(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
            toast.error("Failed to retive data from TMDB ", { autoClose: 2000, position: "top-right", closeButton: true })

        }
    }

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
            style={{ pointerEvents: `${tmdbTitle ? 'all' : 'none'}`, cursor: `${tmdbTitle ? 'pointer' : 'not-allowed'}`, opacity: `${tmdbTitle ? 1 : 0.5}` }}
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