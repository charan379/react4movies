import React from 'react'
import MoviesList from './MoviesList'
import useTheme from '../../utils/hooks/useTheme'

const Collection = () => {
    const {theme} = useTheme();
    return (
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

export default Collection