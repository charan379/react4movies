import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle';

const Favourite = ({ toast }) => {

    const { title, setTitle } = useTitle();

    const { movieBunkersAPI } = useMovieBunkersAPI();

    const [isLoading, setIsLoading] = useState(false);

    const addToFavouriteTitles = (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);
        movieBunkersAPI.post(`/userdata/add-to-favourite/${base64TitleId}`)
            .then((response) => {
                setTitle({ ...title, favouriteByUser: true })
                // toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true, delay: 50 })
            }).finally(() => {
                setIsLoading(false);
            })
    }

    const removeFromFavouriteTitles = (event, base64TitleId) => {
        event.preventDefault();
        setIsLoading(true);
        movieBunkersAPI.post(`/userdata/remove-from-favourite/${base64TitleId}`)
            .then((response) => {
                setTitle({ ...title, favouriteByUser: false })
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
            {title?.favouriteByUser && (
                <Link className="action-button" onClick={(event) => removeFromFavouriteTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    {isLoading
                        ? <span> <i class="fas fa-circle-notch fa-pulse fa-lg"></i> </span>
                        : <span style={{ color: "rgba(255, 20, 70, 1)" }}>
                            <i className="fas fa-heart fa-lg"></i>
                        </span>
                    }

                </Link>
            )}

            {!title?.favouriteByUser && (
                <Link className="action-button" onClick={(event) => addToFavouriteTitles(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span>
                        {isLoading
                            ? <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                            : <i className="far fa-heart fa-lg"></i>
                        }
                    </span>
                </Link>
            )}
        </>
    )
}

export default Favourite;