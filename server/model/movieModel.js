const mongoose = require('mongoose');

// movie Schema
const movieSchema = new mongoose.Schema(
    {
        tmdbId : {
            type : String,
        },
        imdbId : {
            type : String,
        },
        originalTitle : {
            type : String,
        },
        originalLanguage : {
            type : String,
        },
        originCountry : {
            type : String,
        },
        title : {
            type : String,
        },
        overview : {
            type : String,
        },
        tagline : {
            type : String,
        },
        titleType : {
            type :String,
        },
        geners : {
            type : Array,
        },
        status : {
            type : String
        },
        releaseDate : {
            type : String,
        },
        ageRating : {
            type : Number,
        },
        popularity : {
            type : Number,
        },
        tmdb_vote_average : {
            type : Number,
        },
        tmdb_vote_count : {
            type : Number,
        },
        addedBy : {
            type : String
        },
        lastUpdatedBy : {
            type : String,
        },
        tmdbPosterPath : {
            type : String,
        },
        number_of_episodes : {
            type : Number,
        },
        number_of_seasons : {
            type : Number,
        },
    },
    {
        timestamps : {
            createdAt : true,
            updatedAt : true,
        },
    }
);