import React, { useEffect, useState } from 'react'
import useMovieBunkersAPI from '../../utils/hooks/useMovieBunkersAPI'
import useTheme from '../../utils/hooks/useTheme';
import useTmdbAPI from '../../utils/hooks/useTmdbAPI'
import Logger from '../utils/Logger';
import ProgressBar from '../utils/ProgresBar'
import formatTime from '../../utils/formatTime';
import { Link } from 'react-router-dom';
import useSeasonsUpdater from '../../utils/hooks/useSeasonsUpdater';

const UpdateAll = () => {
    const { theme } = useTheme();
    const [state, setState] = useState(0);
    const [title, setTitle] = useState({});
    const { movieBunkersAPI } = useMovieBunkersAPI();
    const { tmdbAPI } = useTmdbAPI();
    const { updateSeasons } = useSeasonsUpdater();
    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [updated, setUpdated] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        movieBunkersAPI.get(`/titles?search=&genre=&movie=1&starred=0&favourite=0&seen=0&age.gte=0&country=IN&page=1&minimal=true&tv=1&sort_by=createdAt.desc&&age.lte=26&pageNo=1`)
            .then((result) => {
                setMovies(result?.data?.list);
                setTotalMovies(result?.data?.list?.length ?? 0)
            })
            .catch(err => {
                setErrors((errors) => [...errors, { name: 'get all movies', error: err?.message }])
            })
    }, []);

    const updateMovies = async () => {
        setStartTime(Date.now());
        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            try {
                setCurrentIndex(i + 1);
                setTitle({ ...movie });
                const res = await tmdbAPI.get(`${movie?.title_type}/${movie?.tmdb_id}`);
                const update = res?.data;
                const { data: { title: updatedTitle } } = await movieBunkersAPI.put(`/titles/update/id/${btoa(movie?._id).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')}`, update);
                if (updatedTitle?.title_type === 'tv') {
                    await updateSeasons({ tmdbTvId: updatedTitle?.tmdb_id, moviebunkersTitleId: updatedTitle?._id, numberOfSeasons: updatedTitle?.number_of_seasons })
                }
                setState(Math.floor(((i + 1) / movies.length) * 100));
                setUpdated((updated) => [...updated, { name: `${movie?.title} : ${movie?.tmdb_id}`, status: 'Updated' }])
            } catch (error) {
                setUpdated((updated) => [...updated, { name: `${movie?.title} : ${movie?.tmdb_id}`, status: 'Failed', error: error?.message }])
                setErrors((errors) => [...errors, { name: `${movie?.title} : ${movie?.tmdb_id}`, error: error?.message }])
            }
        }
        setEndTime(Date.now());
    };

    const elapsedTime = startTime && endTime ? endTime - startTime : null;

    return (
        <div className={`collection-sync ${theme}`}>
            <h3 className="heading">Update/Sync All</h3>

            {/* progress bar */}
            <div className='progress-bar-container'>
                <ProgressBar bgcolor="#32C104" progress={state} height={'20px'} />
                {title?.title && state < 100 && (
                    <>
                        <div className='progress-info'>
                            <span>
                                <i style={{ color: '#7A50EE' }} className="fas fa-compact-disc fa-pulse fa-lg"></i>
                                &nbsp;
                                {title?.title} : {title?.tmdb_id}
                            </span>
                            <span>
                                {currentIndex} / {totalMovies}
                            </span>
                        </div>
                    </>

                )}
            </div>

            {currentIndex === 0 && (
                <button className='button' onClick={updateMovies}>Start Update</button>
            )}

            {state === 100 && (
                <>
                    <p><i style={{ color: '#32C104' }} className="fas fa-check-circle fa-lg"></i> &nbsp; All Movies Updated</p>
                    <p><i style={{ color: '#7A50EE' }} className="fas fa-hourglass-end"></i> &nbsp; Elapsed time: {formatTime(elapsedTime)}</p>
                    <p><Link className='button' to={'/'}>
                        Home
                    </Link></p>
                </>

            )}

            {state < 100 && currentIndex > 0 && (
                <p> <i className="fas fa-sync-alt fa-pulse fa-lg"></i> &nbsp; Updating sit back and relax...</p>
            )}

            <Logger logs={updated} title="Updated Movies" key={1} />
            <br />
            <Logger logs={errors} title="Errors" key={2} />

        </div>
    );
};

export default UpdateAll;
