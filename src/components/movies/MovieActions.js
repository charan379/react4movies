import React from 'react'
import { Link } from 'react-router-dom';
import useTheme from '../../utils/hooks/useTheme'

const MovieActions = () => {

    const { theme } = useTheme();

    return (
        <div className={`movie-actions ${theme}`}>

            <div className="user-related">
                <Link className="action-button">
                    <span>
                        <i className="fas fa-eye-slash fa-lg"></i>
                    </span>
                </Link>
                <Link className="action-button">
                    <span>
                        <i className="fas fa-star fa-lg"></i>
                    </span>
                </Link>
                <Link className="action-button">
                    <span>
                        <i className="fas fa-heart fa-lg"></i>
                    </span>
                </Link>
            </div>

            <div className="moderator-related">
                <Link className="action-button" >
                    <span>
                        <i
                            className="fas fa-pencil-alt fa-lg">
                        </i>
                        Edit
                    </span>
                </Link>

                <Link className="action-button">
                    <span>
                        <i
                            className="fas fa-sync-alt fa-lg" >
                        </i>
                        Update/Sync
                    </span>
                </Link>

                <Link className="action-button">
                    <span>
                        <i
                            className="fas fa-trash-alt fa-lg">
                        </i>
                        Delete
                    </span>
                </Link>

                <Link
                    className="action-button">
                    <span>
                        <i
                            className="fas fa-cloud-download-alt fa-lg">
                        </i>
                        Add to collection
                    </span>
                </Link>
            </div>

        </div>
    )
}

export default MovieActions