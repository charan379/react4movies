import { SeasonCard } from 'components/season';
import './season-list.style.css';
import React from 'react'

const SeasonList = ({ titleId, titleState, seasons = null, limit = 3, getAllSeasons = false }) => {

  if (seasons && seasons instanceof Array) {
    return (
      <div className='season-list'>
        {seasons?.sort((season1, season2) =>
          season2?.season_number - season1?.season_number
        ).slice(0, limit)?.map((season, index) => {
          return <SeasonCard key={index} season={season} />
        })}
      </div>
    )
  }

  return (
    <div className='season-list'>
      <div className='error-message'>
        Seasons not available
      </div>
    </div>
  )
}

export { SeasonList };