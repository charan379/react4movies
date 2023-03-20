import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../../../../utils/Config';
import useTitle from '../../../../utils/hooks/useTitle';

const Seen = ({ toast }) => {

    const API = Config.MOVIEBUNKERS_API;

    const { title, setTitle } = useTitle();

    const addToSeenTitles = (base64TitleId) => {
        // const toastId = toast.loading("Adding to seen...", { position: "top-right", closeButton: true, autoClose: 1000 });
        axios.post(`${API}/userdata/add-to-seen/${base64TitleId}`, {}, { withCredentials: true })
            .then((response) => {
                // toast.update(toastId, {
                //     render: response.data?.message,
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 2000,
                //     delay: 50,
                // });
                setTitle({ ...title, seenByUser: true, unseenByUser: false })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 3000, position: "top-right", closeButton: true })
            })
    }

    const addToUnseenTitles = (base64TitleId) => {
        // const toastId = toast.loading("Adding to unseen...", { position: "top-right", closeButton: true, autoClose: 1000 });
        axios.post(`${API}/userdata/add-to-unseen/${base64TitleId}`, {}, { withCredentials: true })
            .then((response) => {
                // toast.update(toastId, {
                //     render: response.data?.message,
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 2000,
                //     delay: 50,
                // });
                setTitle({ ...title, unseenByUser: true, seenByUser: false })
            }).catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 3000, position: "top-right", closeButton: true })
            })
    }



    return (

        <>
            {title?.seenByUser && (
                <Link className="action-button" onClick={() => addToUnseenTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span /*style={{ color: 'rgba(16,125,172, 1)' }} */>
                        <i className="fas fa-eye fa-lg"></i>
                    </span>
                </Link>
            )}

            {title?.unseenByUser && (
                <Link className="action-button" onClick={() => addToSeenTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span /*style={{ color: 'rgba(16,125,172, 1)' }} */>
                        <i className="fas fa-eye-slash fa-lg"></i>
                    </span>
                </Link>
            )}

            {!title?.unseenByUser && !title?.seenByUser && (
                <Link className="action-button" onClick={() => addToSeenTitles(btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
                    <span style={{ opacity: '0.3' }}>
                        <i className="fas fa-eye fa-lg"></i>
                    </span>
                </Link>
            )}
        </>
    )
}

export default Seen