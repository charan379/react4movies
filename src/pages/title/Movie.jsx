import React from "react";
import { useTheme, useTitle } from "hooks";
import { TitleDetails, TitlePoster } from "components/title";
import { TitleActions } from "features/title-actions"; // component for title action buttons
import { Head } from "layout";
import { LinkList } from "features/link";
import ShortForms from "constants/ShortForms";

// Movie component
const Movie = () => {
  // Get the theme from the useTheme hook
  const { theme } = useTheme();

  // Get the title from the useTitle hook
  const { title: movie } = useTitle();

  // Render the title page
  return (
    <>
      <Head
        title={movie?.title + " " + movie?.year + " | " + movie?.state}
        url={window.location.href}
        image={movie?.poster_path}
        description={movie?.overview}
      />
      <div id={"title-page"} className={`title-page ${theme}`}>
        {/* title page */}
        <div className="title-title-section">
          {/* title name */}
          {/* Render the title title and year */}
          {movie?.title}
          <small>({movie?.year})</small>
        </div>

        <div className="title-poster-section">
          {/* title poster */}
          {/* Render the title poster */}
          <TitlePoster
            url={movie?.poster_path}
            alt={movie?.title}
            tagline={movie?.tagline}
          />
          {/* component for displaying title action buttons */}
          <TitleActions />
        </div>

        <div className="title-details-section">
          {/* title details */}
          {/* Render the title details */}
          <TitleDetails />
        </div>

        {/* links */}
        {movie?.state === ShortForms.Moviebunkers && (
          <div className="title-links-section">
            <h2 className="page-section-heading" id="links">
              Links
              <span>
                &nbsp;
                <i className="fas fa-chevron-right fa-lg"></i>
              </span>
            </h2>
            <LinkList parentId={movie?._id} titleState={movie?.state} />
          </div>
        )}
      </div>
    </>
  );
};

// Export the title component
export { Movie };
