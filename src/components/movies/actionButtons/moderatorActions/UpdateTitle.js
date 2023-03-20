import React from 'react'
import { Link } from 'react-router-dom'

const UpdateTitle = () => {
    return (
        <Link
         className="action-button">
            <span>
                <i
                    className="fas fa-sync-alt fa-lg" >
                </i>
                Update/Sync
            </span>
        </Link>
    )
}

export default UpdateTitle