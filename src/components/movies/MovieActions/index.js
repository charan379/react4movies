import React from 'react'
import useTheme from '../../../utils/hooks/useTheme'
import useTitle from '../../../utils/hooks/useTitle';
import useToastify from '../../../utils/hooks/useToast';
import AddTitle from './Moderator/AddTitle';
import DeleteTitle from './Moderator/DeleteTitle';
import EditTitle from './Moderator/EditTitle';
import UpdateTitle from './Moderator/UpdateTitle';
import Favourite from './User/Favourite';
import Seen from './User/Seen';
import Star from './User/Star';

const MovieActions = () => {

    const { ToastContainer, toastContainerOptions, toast } = useToastify();

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

            <div className="moderator-related">
                {title?.state === "moviebunkers" && (
                    <>
                        <EditTitle toast={toast} />
                        <UpdateTitle toast={toast} />
                        <DeleteTitle toast={toast} />
                    </>
                )}
                {title?.state === "tmdb" && (
                    <>
                        <AddTitle toast={toast} />
                    </>
                )}
            </div>
            <ToastContainer {...toastContainerOptions} />
        </div>
    )
}

export default MovieActions