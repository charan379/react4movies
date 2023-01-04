import React from 'react'
import MoviesList from './MoviesList'

const Collection = () => {
    return (
        <React.Fragment>
            <section className='content'>
                <div className="row">
                    <div className="col-md-12 movie-wrapper">
                        <div id="results">
                            <MoviesList />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Collection