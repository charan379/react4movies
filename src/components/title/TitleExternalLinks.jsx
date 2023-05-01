import './styles/title-external-links.style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import imdbLogo from 'assets/imdb-logo.svg';
import tmdbLogo from 'assets/tmdb-logo-black-bg.svg';

const TitleExternalLinks = ({ links = [] }) => {

    const externalLinkLogs = {
        IMDB: imdbLogo,
        TMDB: tmdbLogo
    };
    console.log(links)
    return (
        <>
            <div className={`title-external-links`}>
                {links?.map((link, index) => {
                    return (
                        <Link key={`${index}`} id={`title-external-link-${index}`} title={link?.destination} onClick={() => window.open(link?.path, "_blank", "noreferrer")}>
                            <img src={externalLinkLogs?.[link?.destination]} alt={link?.destination} className="title-external-link-img" />
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export { TitleExternalLinks };