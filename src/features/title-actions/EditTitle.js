import React from 'react'
import { Link } from 'react-router-dom'

const EditTitle = () => {
    return (
        <Link className="action-button" >
            <span>
                <i
                    className="fas fa-pencil-alt fa-lg">
                </i>
                Edit
            </span>
        </Link>
    )
}

export default EditTitle