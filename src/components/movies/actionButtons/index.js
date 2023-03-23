import React from 'react'
import { LevelThere, LevelTwo } from '../../../constants/AuthRoles';
import useAuth from '../../../utils/hooks/useAuth';
import useTheme from '../../../utils/hooks/useTheme';
import useTitle from '../../../utils/hooks/useTitle';
import useToastify from '../../../utils/hooks/useToast';
import AddTitle from './moderatorActions/AddTitle';
import DeleteTitle from './moderatorActions/DeleteTitle';
import EditTitle from './moderatorActions/EditTitle';
import UpdateTitle from './moderatorActions/UpdateTitle';
import Favourite from './userActions/Favourite';
import Seen from './userActions/Seen';
import Star from './userActions/Star';

const MovieActions = () => {

    const { ToastContainer, toastContainerOptions, toast } = useToastify();

    const { auth } = useAuth();

    const { title } = useTitle();



    const { theme } = useTheme();

    return (
        <div className={`movie-actions ${theme}`}>

            <div className="user-related">
                {title?.state === "moviebunkers" && (
                    <>
                        <Star toast={toast} />
                        <Seen toast={toast} />
                        <Favourite toast={toast} />
                    </>
                )}
            </div>

            {LevelTwo.includes(auth?.role) && (
                <div className="moderator-related">
                    {title?.state === "moviebunkers" && (
                        <>
                            <EditTitle toast={toast} />
                            <UpdateTitle toast={toast} />
                            {LevelThere.includes(auth?.role) && (
                                <DeleteTitle toast={toast} />
                            )}
                        </>
                    )}
                    {title?.state === "tmdb" && (
                        <>
                            <AddTitle toast={toast} />
                        </>
                    )}
                </div>
            )}

            <ToastContainer {...toastContainerOptions} />
        </div>
    )
}

export default MovieActions