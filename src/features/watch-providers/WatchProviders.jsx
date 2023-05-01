import { useTmdbAPI } from 'hooks'; // Import useTmdbAPI hook custom axios instance
import './watch-providers.style.css'; // Import CSS file for component styling
import axios from 'axios'; // Import Axios library for HTTP requests
import React, { useEffect, useState } from 'react' // Import React components
import { Link } from 'react-router-dom' // Import Link component for navigation

const WatchProviders = ({ tmdb_id, title_type, country }) => {

    // Declare state variables using the useState hook
    const [mainLink, setMainLink] = useState(""); // main link to redirect users to a streaming service's website
    const [providers, setProviders] = useState([]); // array of streaming service providers
    const [error, setError] = useState(""); // error message if no providers are available in the user's region

    // Destructure the tmdbAPI custom axios instance from the useTmdbAPI hook
    const { tmdbAPI } = useTmdbAPI();

    // Async function to fetch watch providers
    const fetchWatchProviders = async ({ cancelToken }) => {
        try {
            // Use axios to make a GET request to the TMDB API to fetch watch providers for a given movie or TV show
            const result = await tmdbAPI.get(`/providers/${title_type}/${tmdb_id}/${country ?? 'IN'}`, { cancelToken: cancelToken });
            // If successful, clear any existing error message and update the state variables for mainLink and providers with the data returned from the API
            setError("");
            setMainLink(result.data?.tmdb_link);
            setProviders(result.data?.providers);
        } catch (error) {
            // If there was an error, set the error state variable to a message indicating no providers are available in the user's region
            setError("No watch providers available in your region.");
        }
    };

    // Use the useEffect hook to call the fetchWatchProviders function when the component mounts or when any of the dependencies (tmdb_id, title_type, or country) change
    useEffect(() => {
        // Create a new axios CancelToken source
        const source = axios.CancelToken.source();

        // Call the fetchWatchProviders function with the CancelToken as an argument
        fetchWatchProviders({ cancelToken: source.token });

        // Return a cleanup function to cancel the request if the component unmounts
        return () => {
            source.cancel();
        }
    }, [tmdb_id, title_type, country]);

    // Render the component's UI
    return (
        <>
            <div className={`watch-providers`}>
                {providers.map((provider, index) => {
                    {/**For each provider in the array of providers, 
                render a Link component that opens the provider's website in a new tab when clicked */ }
                    return (
                        <Link key={`${index}`} id={`provider-${index}`} title={provider.provider_name} onClick={() => window.open(mainLink, "_blank", "noreferrer")}>
                            <img src={provider.logo_path} alt={provider.provider_name} className="watch-provider" />
                        </Link>
                    )
                })}
                {/* If there was an error fetching watch providers, display the error message */}
                {error !== "" && error}
            </div>
        </>
    )
}

// Export the WatchProviders component
export { WatchProviders };
