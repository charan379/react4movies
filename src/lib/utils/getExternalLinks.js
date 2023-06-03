
export const getExternalLinks = (title) => {
    const externalLinks = [];
    if (title?.imdbId) {
        externalLinks.push({ destination: 'IMDB', path: `https://www.imdb.com/title/${title?.imdbId}` })
    }

    if (title?.tmdbId) {
        externalLinks.push({ destination: 'TMDB', path: `https://www.themoviedb.org/${title?.titleType}/${title?.tmdbId}` })
    }

    return externalLinks;
};