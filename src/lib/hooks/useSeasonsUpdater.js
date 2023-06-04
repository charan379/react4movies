import { createTvSeason } from "../api/moviebunkers/methods/createTvSeason";
import { createTvSeasonEpisode } from "../api/moviebunkers/methods/createTvSeasonEpisode";
import { fetchTvSeasonEpisodes } from "../api/moviebunkers/methods/fetchTvSeasonEpisodes";
import { fetchTvSeasons } from "../api/moviebunkers/methods/fetchTvSeasons";
import { updateTvSeason } from "../api/moviebunkers/methods/updateTvSeason";
import { updateTvSeasonEpisode } from "../api/moviebunkers/methods/updateTvSeasonEpisode";
import { fetchTmdbTvSeason } from "../api/themoviedb/fetchTmdbTvSeason";

const useSeasonsUpdater = (auth) => {

    const updateEpisodes = async ({ moviebunkersTitleId, moviebunkersSeasonId, seasonNumber, tmdbEpisodes }) => {
        try {
            // Get the existing episodes for this season from the movieBunkersAPI
            const moviebunkersEpisodes = await fetchTvSeasonEpisodes({ auth, titleId: moviebunkersTitleId, seasonNumber });

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
                    await updateTvSeasonEpisode({ auth, episodeId: moviebunkersEpisode._id, update: data });
                }
                // Otherwise, add a new episode to movieBunkersAPI
                else {
                    await createTvSeasonEpisode({ auth, episode: data });
                }
            }
        }
        // Catch any errors and log them to the console or throw a custom error with a helpful message
        catch (error) {
            console.error(`Error updating episodes: ${error?.message}`);
            // or throw new Error('Error updating episodes: ' + error.message);
        }
    };


    const updateSeasons = async ({ tmdbTvId, moviebunkersTitleId, numberOfSeasons }) => {
        try {
            // Get the seasons data for the given moviebunkersTitleId
            const moviebunkersSeasons = await fetchTvSeasons({ auth, titleId: moviebunkersTitleId });

            // Loop through each season
            for (let i = 1; i <= numberOfSeasons; i++) {
                try {
                    // Get the season data for the given tmdbTvId and season number
                    const tmdbSeason = await fetchTmdbTvSeason({ tmdbTitleId: tmdbTvId, seasonNumber: i });

                    // Find the matching season in moviebunkersSeasons data
                    const moviebunersSeason = moviebunkersSeasons?.find(season => season?.season_number === i);

                    // Extract the required fields from the tmdbSeason data
                    const { air_date, name, season_number, episode_count, poster_path, overview, episodes, videos, images } = tmdbSeason;

                    // Update the season data if it exists in moviebunkersSeasons, otherwise add new season data
                    const updatedSeason = moviebunersSeason
                        ? await updateTvSeason({
                            auth, seasonId: moviebunersSeason._id, update: {
                                "tv_show_id": moviebunkersTitleId,
                                air_date, name, season_number, episode_count, poster_path, overview, videos, images
                            }
                        })
                        : await createTvSeason({
                            auth, season: {
                                "tv_show_id": moviebunkersTitleId,
                                air_date, name, season_number, episode_count, poster_path, overview, videos, images
                            }
                        })

                    // update episodes of season
                    await updateEpisodes({ moviebunkersTitleId: updatedSeason?.tv_show_id, moviebunkersSeasonId: updatedSeason?._id, seasonNumber: season_number, tmdbEpisodes: episodes });

                } catch (error) {
                    // Handle errors properly
                    console.error(`Error updating season ${i}: ${error?.message}`);
                }
            }

        } catch (error) {
            // Handle errors properly
            console.error(`Error getting moviebunkersSeasons data: ${error?.message}`);
        }
    };

    return { updateSeasons }
}

export { useSeasonsUpdater };