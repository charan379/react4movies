import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useMovieBunkersAPI from '../../../../utils/hooks/useMovieBunkersAPI';
import useTitle from '../../../../utils/hooks/useTitle';

const DeleteTitle = ({ toast }) => {

    const { title } = useTitle();

    const location = useLocation();

    const navigate = useNavigate();

    const { movieBunkersAPI } = useMovieBunkersAPI();

    const [isLoading, setIsLoading] = useState(false);

    const deleteTitle = (event, titleId) => {
        event.preventDefault();
        setIsLoading(true)
        movieBunkersAPI.delete(`/titles/delete/id/${titleId}`)
            .then((response) => {
                toast.success(response?.data?.message, { autoClose: 1000, position: "top-left", closeButton: true });
                setTimeout(() => {
                    if (/^\/view.{0,}/.test(location.pathname)) {
                        navigate(-1)
                    } else {
                        const closeBtn = document.getElementsByClassName('closeBtn')[0];
                        const clickEvent = new MouseEvent('click', { bubbles: true });
                        closeBtn.dispatchEvent(clickEvent);
                    }
                }, 1000);
            })
            .catch((error) => {
                const errMsg = error?.response?.data?.error?.message
                toast.error(errMsg ?? "Somthing went wrong", { autoClose: 2000, position: "top-right", closeButton: true })
            }).finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <Link className="action-button"
            onClick={(event) => deleteTitle(event, btoa(title?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'))}>
            {isLoading
                ? <span> <i class="fas fa-circle-notch fa-pulse fa-lg"></i>
                    Deleting....
                </span>
                : <span>
                    <i className="fas fa-trash-alt fa-lg"></i>
                    Delete
                </span>
            }
        </Link>
    )
}

export default DeleteTitle