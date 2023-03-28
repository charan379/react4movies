import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle';

const Star = ({ toast }) => {
    const { title, setTitle } = useTitle();

    const [isLoading, setIsLoading] = useState(false);

    const { movieBunkersAPI } = useMovieBunkersAPI();

    const addToStarredTitles = (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);
        movieBunkersAPI.post(`/userdata/add-to-starred/${base64TitleId}`)
            .then((response) => {
                setTitle({ ...title, starredByUser: true })
                // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true, delay: 50 })
            })
            .catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true })
            }).finally(() => {
                setIsLoading(false);
            })
    }

    const removeFromStarredTitles = (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);
        movieBunkersAPI.post(`/userdata/remove-from-starred/${base64TitleId}`)
            .then((response) => {
                setTitle({ ...title, seenByUser: true, starredByUser: false })
                // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true, delay: 50 })
            })
            .catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true })
            }).finally(() => {
                setIsLoading(false);
            })
    }

    return (

        <>
            {title?.starredByUser && (
                <Link className="action-button" onClick={(event) => removeFromStarredTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    {isLoading
                        ? <span><i class="fas fa-circle-notch fa-pulse fa-lg"></i></span>
                        : <span style={{ color: "rgba(255, 172, 0, 1)" }}>
                            <i className="fas fa-star fa-lg"></i>
                        </span>
                    }
                </Link>
            )}

            {!title?.starredByUser && (
                <Link className="action-button" onClick={(event) => addToStarredTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span>
                        {isLoading
                            ? <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                            : <i className="far fa-star fa-lg"></i>}
                    </span>
                </Link>
            )}
        </>


    )
}

export default Star