import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../../utils/Config';

const WatchProviders = ({ tmdb_id, title_type, country }) => {

    // const data = {
    //     "tmdb_link": "https://www.themoviedb.org/tv/1399-game-of-thrones/watch?locale=US",
    //     "providers": [
    //         {
    //             "logo_path": "https://image.tmdb.org/t/p/original/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg",
    //             "provider_id": 384,
    //             "provider_name": "HBO Max",
    //             "display_priority": 7
    //         },
    //         {
    //             "logo_path": "https://image.tmdb.org/t/p/original/qNVZUR6koKFlOFdycB0D9cewBEm.jpg",
    //             "provider_id": 1825,
    //             "provider_name": "HBO Max Amazon Channel",
    //             "display_priority": 9
    //         },
    //         {
    //             "logo_path": "https://image.tmdb.org/t/p/original/79mRAYq40lcYiXkQm6N7YErSSHd.jpg",
    //             "provider_id": 486,
    //             "provider_name": "Spectrum On Demand",
    //             "display_priority": 169
    //         }
    //     ]
    // }

    
    const [mainLink, setMainLink] = useState("");

    const [providers, setProviders] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${Config.TMDB_API}/providers/${title_type}/${tmdb_id}/${country ?? 'IN'}`)
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
            <div>
                {providers.map(provider => {
                    return (
                        <Link title={provider.provider_name} onClick={() => window.open(mainLink, "_blank", "noreferrer")}>
                            <img src={provider.logo_path} alt={provider.provider_name} className="watch-provider" />
                        </Link>
                    )
                })}
                {error !== "" && error}
            </div>
        </>
    )
}

export default WatchProviders