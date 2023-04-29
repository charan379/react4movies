import './watch-providers.style.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppConfig } from 'setup/app-config';

const WatchProviders = ({ tmdb_id, title_type, country }) => {

    const [mainLink, setMainLink] = useState("");

    const [providers, setProviders] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${AppConfig.TMDB_API}/providers/${title_type}/${tmdb_id}/${country ?? 'IN'}`, { cancelToken: source.token })
            .then(result => {
                setError("")
                setMainLink(result.data?.tmdb_link);
                setProviders(result.data?.providers);
            }).catch(err => {
                setError("No watch providers available in your region.");
            })
        return () => {
            source.cancel();
        }
    }, [tmdb_id, title_type, country])

    return (
        <>
            <div className={`watch-providers`}>
                {providers.map((provider, index) => {
                    return (
                        <Link key={`${index}`} id={`provider-${index}`} title={provider.provider_name} onClick={() => window.open(mainLink, "_blank", "noreferrer")}>
                            <img src={provider.logo_path} alt={provider.provider_name} className="watch-provider" />
                        </Link>
                    )
                })}
                {error !== "" && error}
            </div>
        </>
    )
}

export { WatchProviders };