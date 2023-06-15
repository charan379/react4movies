
export const getExternalLinks = (title) => {
    const externalLinks = [];
    if (title?.imdbId || title?.imdb_id) {
        externalLinks.push({ destination: 'IMDB', path: `https://www.imdb.com/title/${title?.imdbId ?? title?.imdb_id}` })
    }

    if (title?.tmdbId || title?.tmdb_id) {
        externalLinks.push({ destination: 'TMDB', path: `https://www.themoviedb.org/${title?.titleType ?? title?.title_type}/${title?.tmdbId ?? title?.tmdb_id}` })
    }

    return externalLinks;
};