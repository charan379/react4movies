import React from 'react'
import MoviesList from './MoviesList'

const Collection = () => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12 collection-wrapper">
                    <div id="results">
                        <MoviesList />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Collection