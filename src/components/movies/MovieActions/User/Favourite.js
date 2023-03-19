import axios from 'axios';
import { data, error } from 'jquery';
import React from 'react'
import { Link } from 'react-router-dom';
import { Config } from '../../../../utils/Config';
import useTitle from '../../../../utils/hooks/useTitle';

const Favourite = ({ toast }) => {

    const API = Config.MOVIEBUNKERS_API;

    const { title, setTitle } = useTitle();


    const addToFavouriteTitles = (base64TitleId) => {
        // const toastId = toast.loading("Adding to favourites...", { position: "top-right", closeButton: true, autoClose: 1000 });
        axios.post(`${API}/userdata/add-to-favourite/${base64TitleId}`, {}, { withCredentials: true })
            .then((response) => {
                // toast.update(toastId, {
                //     render: response.data?.message,
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 2000,
                //     delay: 50,
                // });
                setTitle({ ...title, favouriteByUser: true })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 3000, position: "top-right", closeButton: true })
            })
    }

    const removeFromFavouriteTitles = (base64TitleId) => {
        const toastId = toast.loading("Removing from favourites...", { position: "top-right", closeButton: true, autoClose: 1000 });
        axios.post(`${API}/userdata/remove-from-favourite/${base64TitleId}`, {}, { withCredentials: true })
            .then((response) => {
                // toast.update(toastId, {
                //     render: response.data?.message,
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 2000,
                //     delay: 50,
                // });
                setTitle({ ...title, favouriteByUser: false })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 3000, position: "top-right", closeButton: true })
            })
    }
    return (

        <>
            {title?.favouriteByUser && (
                <Link className="action-button" onClick={() => removeFromFavouriteTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span style={{ color: "rgba(255, 20, 70, 1)" }}>
                        <i className="fas fa-heart fa-lg"></i>
                    </span>
                </Link>
            )}

            {!title?.favouriteByUser && (
                <Link className="action-button" onClick={() => addToFavouriteTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span>
                        <i className="far fa-heart fa-lg"></i>
                    </span>
                </Link>
            )}
        </>

    )
}

export default Favourite;