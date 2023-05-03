import './season-card.style.css';
import { ShowLessText } from 'components/common'
import { SeasonPoster } from 'components/season/SeasonPoster'
import { useTheme } from 'hooks';
import React from 'react'
import { convertIsoDate } from 'utils';

const SeasonCard = ({ season, moreButton = false }) => {

    const { theme } = useTheme();

    if (!season && moreButton) {
        return (
            <div className={`global-last-card ${theme}`} title='View more seasons'>
                <div className='more-button-section'>
                    <div className='more-button'>
                        <span>
                            <i class="fas fa-angle-double-right"></i>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`season-card ${theme}`}>
            <div className='poster-section'>
                <SeasonPoster poster_path={season?.poster_path} season_name={season?.name} />
            </div>
            <div className='details-section'>
                <div className='season-details'>
                    <h4 className='sub-heading link'>{season?.name}  <span><small>{`( season - ${season?.season_number}) `}</small></span></h4>
                    <h5 className='sub-heading'>{season?.air_date ? convertIsoDate(season?.air_date)?.split('-')[2] + " |" : ""} {season?.episode_count} Episodes</h5>
                    <div className='season-overview'>
                        <p>
                            <ShowLessText
                                text={season?.overview}
                                limit={100} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SeasonCard };