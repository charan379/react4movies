import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../../../../utils/Config';
import useTitle from '../../../../utils/hooks/useTitle';

const Star = ({ toast }) => {

    const API = Config.MOVIEBUNKERS_API;

    const { title, setTitle } = useTitle();


    const addToStarredTitles = (base64TitleId) => {
        // const toastId = toast.loading("Adding to starred...", { position: "top-right", closeButton: true, autoClose: 1000 });
        axios.post(`${API}/userdata/add-to-starred/${base64TitleId}`, {}, { withCredentials: true })
            .then((response) => {
                // toast.update(toastId, {
                //     render: response.data?.message,
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 2000,
                //     delay: 50,
                // });
                setTitle({ ...title, starredByUser: true })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 3000, position: "top-right", closeButton: true })
            })
    }

    const removeFromStarredTitles = (base64TitleId) => {
        // const toastId = toast.loading("Removing from starred...", { position: "top-right", closeButton: true, autoClose: 1000 });
        axios.post(`${API}/userdata/remove-from-starred/${base64TitleId}`, {}, { withCredentials: true })
            .then((response) => {
                // toast.update(toastId, {
                //     render: response.data?.message,
                //     type: "success",
                //     autoClose: 2000,
                //     delay: 50,
                // });
                setTitle({ ...title, starredByUser: false })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message

                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 3000, position: "top-right", closeButton: true })
            })

    }


    return (

        <>
            {title?.starredByUser && (
                <Link className="action-button" onClick={() => removeFromStarredTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span style={{ color: "rgba(255, 172, 0, 1)" }}>
                        <i className="fas fa-star fa-lg"></i>
                    </span>
                </Link>
            )}

            {!title?.starredByUser && (
                <Link className="action-button" onClick={() => addToStarredTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span>
                        <i className="far fa-star fa-lg"></i>
                    </span>
                </Link>
            )}
        </>


    )
}

export default Star