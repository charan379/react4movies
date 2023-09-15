import styles from "./WatchProviders.module.css"; // Import CSS file for component styling
import axios from "axios"; // Import Axios library for HTTP requests
import React, { useEffect, useState } from "react"; // Import React components
import Link from "next/link"; // Import Link component for navigation
import { fetchWatchProviders } from "@/lib/api/themoviedb/fetchWatchProviders";
import BarsLoadingAnimation from "../BarsLoadingAnimation";

const WatchProviders = ({ tmdbId, titleType, country }) => {
  // Declare state variables using the useState hook
  const [mainLink, setMainLink] = useState(""); // main link to redirect users to a streaming service's website
  const [providers, setProviders] = useState([]); // array of streaming service providers
  const [error, setError] = useState(""); // error message if no providers are available in the user's region
  const [isLoading, setIsLoading] = useState(false);

  // Async function to fetch watch providers
  const fetchdata = async ({ source }) => {
    try {
      setError("");
      setIsLoading(true);
      const data = await fetchWatchProviders({
        titleType,
        tmdbId,
        country,
        source,
      });

      setMainLink(data?.tmdb_link);
      setProviders(data?.providers);
    } catch (error) {
      if (error?.message === "cancelled") return;
      // If there was an error, set the error state variable to a message indicating no providers are available in the user's region
      setError("No watch providers available in your region.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // Use the useEffect hook to call the fetchWatchProviders function when the component mounts or when any of the dependencies (tmdb_id, title_type, or country) change
  useEffect(() => {
    // Create a new axios CancelToken source
    const source = axios.CancelToken.source();

    // Call the fetchWatchProviders function with the CancelToken as an argument
    fetchdata({ source });
    // Return a cleanup function to cancel the request if the component unmounts
    return () => {
      source.cancel();
    };
  }, [tmdbId, titleType, country]);

  if (isLoading) {
    return <BarsLoadingAnimation />;
  }
  
  // Render the component's UI
  return (
    <>
      <div className={styles.watchProviders}>
        {providers.map((provider, index) => {
          {
            /**For each provider in the array of providers, 
                render a Link component that opens the provider's website in a new tab when clicked */
          }
          return (
            <Link
              key={`${index}`}
              id={`provider-${index}`}
              title={provider.provider_name}
              rel="noopener noreferrer"
              target="_blank"
              href={mainLink}
            >
              <img
                src={provider.logo_path}
                alt={provider.provider_name}
                className={styles.watchProvider}
              />
            </Link>
          );
        })}
        {/* If there was an error fetching watch providers, display the error message */}
        {error !== "" && error}
      </div>
    </>
  );
};

// Export the WatchProviders component
export default WatchProviders;
