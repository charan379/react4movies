import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle';

const AddTitle = ({ toast }) => {

    const { title } = useTitle();

    const { movieBunkersAPI } = useMovieBunkersAPI();

    const [isLoading, setIsLoading] = useState(false);

    const addTitle = (event, title) => {
        event.preventDefault();
        setIsLoading(true)
        movieBunkersAPI.post(`/titles/new`, { ...title })
            .then((response) => {
                toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true });
            })
            .catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true })
            }).finally(() => {
                setIsLoading(false)
            })

    }
    return (
        <Link
            className="action-button"
            onClick={(event) => addTitle(event, title)}>

            {isLoading
                ? <span> <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                    Adding....
                </span>
                : <span>
                    <i className="fas fa-cloud-download-alt fa-lg"></i>
                    Add to collection
                </span>
            }

        </Link>
    )
}

export default AddTitle