
export const getExternalLinks = (title) => {
    const externalLinks = [];
    if (title?.imdb_id) {
        externalLinks.push({ destination: 'IMDB', path: `https://www.imdb.com/title/${title?.imdb_id}` })
    }

    if (title?.tmdb_id) {
        externalLinks.push({ destination: 'TMDB', path: `https://www.themoviedb.org/${title?.title_type}/${title?.tmdb_id}` })
    }

    return externalLinks;
};