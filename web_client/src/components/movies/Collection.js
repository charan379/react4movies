import React, { useContext } from 'react'
import TmdbMoviesList from './tmdb/TmdbMoviesList'
import {ThemeContext} from '../../utils/store/contextAPI/themeToggler/ThemeContext'

const Collection = () => {
    const {theme} = useContext(ThemeContext)
    return (
        <React.Fragment>
            <div className="row">
                <div className={`col-md-12 collection-wrapper ${theme}`}>
                    <div id="results">
                        <TmdbMoviesList />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Collection