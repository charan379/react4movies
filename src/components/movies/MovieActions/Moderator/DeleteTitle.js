import React from 'react'
import { Link } from 'react-router-dom'

const DeleteTitle = () => {
    return (
        <Link className="action-button">
            <span>
                <i
                    className="fas fa-trash-alt fa-lg">
                </i>
                Delete
            </span>
        </Link>
    )
}

export default DeleteTitle