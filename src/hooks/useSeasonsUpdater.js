import { useTmdbAPI, useMoviebunkersAPI } from 'hooks'

const useSeasonsUpdater = () => {

    const { tmdbAPI } = useTmdbAPI();
    const { movieBunkersAPI } = useMoviebunkersAPI();


    const updateEpisodes = async ({ moviebunkersTitleId, moviebunkersSeasonId, tmdbEpisodes }) => {
        try {
            // Get the existing episodes for this season from the movieBunkersAPI
            const { data: moviebunkersEpisodes } = await movieBunkersAPI.get(`/episodes/tv/${moviebunkersTitleId}/season/${moviebunkersSeasonId}`);

            // Loop through the episodes retrieved from TMDB and update or add them to the movieBunkersAPI
            for (const tmdbEpisode of tmdbEpisodes) {
                // Find the matching episode from movieBunkersAPI, if any
                const moviebunkersEpisode = moviebunkersEpisodes.find((episode) => episode?.episode_number === tmdbEpisode?.episode_number);

                // Create the data object to send to the API, including the TMDB episode data and the TV show and season IDs from movieBunkersAPI
                const data = {
                    ...tmdbEpisode,
                    tv_show_id: moviebunkersTitleId,
                    season_id: moviebunkersSeasonId
                };

                // If a matching episode was found, update it in movieBunkersAPI
                if (moviebunkersEpisode) {
                    await movieBunkersAPI.put(`/episodes/update/${moviebunkersEpisode._id}`, data);
                }
                // Otherwise, add a new episode to movieBunkersAPI
                else {
                    await movieBunkersAPI.post('/episodes/new', data);
                }
            }
        }
        // Catch any errors and log them to the console or throw a custom error with a helpful message
        catch (error) {
            console.error(`Error updating episodes: ${error?.response?.data?.error?.message ?? error?.message}`);
            // or throw new Error('Error updating episodes: ' + error.message);
        }
    };


    const updateSeasons = async ({ tmdbTvId, moviebunkersTitleId, numberOfSeasons }) => {
        try {
            // Get the seasons data for the given moviebunkersTitleId
            const { data: moviebunersSeasons } = await movieBunkersAPI.get(`/seasons/tv/${moviebunkersTitleId}`);

            // Loop through each season
            for (let i = 1; i <= numberOfSeasons; i++) {
                try {
                    // Get the season data for the given tmdbTvId and season number
                    const { data: tmdbSeason } = await tmdbAPI.get(`/tv/${tmdbTvId}/season/${i}`);

                    // Find the matching season in moviebunersSeasons data
                    const moviebunersSeason = moviebunersSeasons?.find(season => season?.season_number === i);

                    // Extract the required fields from the tmdbSeason data
                    const { air_date, name, season_number, episode_count, poster_path, overview, episodes } = tmdbSeason;

                    // Update the season data if it exists in moviebunersSeasons, otherwise add new season data
                    const { data: updatedSeason } = moviebunersSeason
                        ? await movieBunkersAPI.put(`/seasons/update/${moviebunersSeason._id}`, {
                            "tv_show_id": moviebunkersTitleId,
                            air_date, name, season_number, episode_count, poster_path, overview
                        })
                        : await movieBunkersAPI.post(`/seasons/new`, {
                            "tv_show_id": moviebunkersTitleId,
                            air_date, name, season_number, episode_count, poster_path, overview
                        });

                    // update episodes of season
                    await updateEpisodes({ moviebunkersTitleId: updatedSeason?.tv_show_id, moviebunkersSeasonId: updatedSeason?._id, tmdbEpisodes: episodes });

                } catch (error) {
                    // Handle errors properly
                    console.error(`Error updating season ${i}: ${error?.response?.data?.error?.message ?? error?.message}`);
                }
            }

        } catch (error) {
            // Handle errors properly
            console.error(`Error getting moviebunersSeasons data: ${error?.response?.data?.error?.message ?? error?.message}`);
        }
    };

    return { updateSeasons }
}

export { useSeasonsUpdater };