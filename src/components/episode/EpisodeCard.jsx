import './episode-card.style.css';
import { useTheme } from 'hooks'
import React from 'react'
import { ShowLessText } from 'components/common';
import { convertIsoDate } from 'utils';
import { EpisodePoster } from './EpisodePoster';

const EpisodeCard = ({ episode, latest = false, upcoming = false }) => {
    const { theme } = useTheme();

    return (
        <>
            <div className={`episode-card ${theme}`}>
                <div className='poster-section'>
                    <EpisodePoster still_path={episode?.still_path} episode_name={episode?.name} />
                </div>
                <div className='details-section'>
                    <div className='episode-details'>
                        {latest && <h5>Latest</h5>}
                        {upcoming && <h5>Upcoming</h5>}
                        <h4>{episode?.name}</h4>
                        <h5>Season {episode?.season_number} | Episode {episode?.episode_number}</h5>
                        {episode?.runtime && <span><i class="fas fa-clock"></i> {episode?.runtime} mins</span>}
                        {episode?.air_date && (<span><i class="far fa-calendar-alt"></i> {convertIsoDate(episode?.air_date)}</span>)}

                        {episode?.overview && (
                            <div className='episode-overview'>
                                <ShowLessText text={episode?.overview} limit={150} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export { EpisodeCard }