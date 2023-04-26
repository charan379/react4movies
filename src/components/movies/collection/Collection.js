import React from 'react'
import MoviesList from './MoviesList'
import useTheme from '../../../utils/hooks/useTheme'

const Collection = () => {
    // Get the current theme from the useTheme hook
    const { theme } = useTheme();

    return (
        // Render a div that wraps the MoviesList component
        <React.Fragment>
            <div className="row">
                <div className={`col-md-12 collection-wrapper ${theme}`}>
                    <div id="results">
                        <MoviesList />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Collection;
