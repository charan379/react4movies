import React from 'react'
import useTheme from '../../utils/hooks/useTheme';
import MovieDetails from './MovieDetails';
import MoviePoster from './MoviePoster';
import Seasons from './tmdb/Tv/Seasons';

const Tv = ({ tv }) => {

    const { theme } = useTheme();

    return (
        <>
            <div className={`movie-page ${theme}`}>

                <div className="movie-title">
                    {tv?.title}
                    <small> ({tv?.year})</small>
                </div>

                <div className="movie-poster">
                    <MoviePoster
                        data={{
                            url: tv?.poster_path,

                            alt: tv?.title,

                            tagline: tv?.tagline,
                        }}
                        title={{ ...tv }}
                    />
                </div>


                <div className="movie-details">
                    <MovieDetails
                        titleData={{ ...tv }}
                        titleType={tv.title_type}
                    />
                </div>


                <Seasons
                    data={{
                        latest_episode: tv?.last_episode_aired,
                        upcoming_episode: tv?.next_episode_to_air,
                        seasons: tv?.seasons,
                    }}
                />
            </div>
        </>
    )
}

export default Tv