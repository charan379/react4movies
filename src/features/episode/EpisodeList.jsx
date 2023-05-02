import './episode-list.style.css';
import { EpisodeCard } from 'components/episode';
import React from 'react'

const EpisodeList = ({ titleId, seasonId, titleState, lastestEpisode = null, upcomingEpisode = null, getAllEpisodes = true }) => {

    if ((!getAllEpisodes) && (lastestEpisode || upcomingEpisode)) {
        return (
            <>
                <div className={`episode-list`}>
                    {lastestEpisode && (
                        <EpisodeCard key={1 * 2} episode={lastestEpisode} latest={true} />
                    )}
                    {upcomingEpisode && (
                        <EpisodeCard key={2 * 2} episode={upcomingEpisode} upcoming={true} />
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={`episode-list`}>

                </div>
            </>
        )
    }
}

export { EpisodeList };