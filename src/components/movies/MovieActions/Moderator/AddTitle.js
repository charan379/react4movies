import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { newTitle } from '../../../../helpers/moviebunkers.requests';
import useTitle from '../../../../utils/hooks/useTitle';

const AddTitle = ({ toast }) => {

    const { title } = useTitle();

    const addTitle = ({ title }) => {
        const toastId = toast.loading("Adding new title...", { position: "top-right" });
        newTitle({ title, cancelToken: axios.CancelToken.source().token }).then((result) => {
            toast.update(toastId, {
                render: result?.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
                delay: 50,
            });
        }).catch((error) => {
            toast.update(toastId, {
                render: error?.message ?? "Somthing went wrong",
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });
        })
    }


    return (
        <Link
            className="action-button"
            onClick={() => addTitle({ title: title })}>
            <span>
                <i
                    className="fas fa-cloud-download-alt fa-lg">
                </i>
                Add to collection
            </span>
        </Link>
    )
}

export default AddTitle