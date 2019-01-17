import axios from 'axios';

async function getMovies(filter) {
    var movies = await axios.get(`http://www.omdbapi.com/?apikey=d777cf78&s=${filter.byName}&type=movie&page=${filter.pageNum}`)
    return movies
}

async function getMovieById(movieId){
var theMovie = await axios.get(`http://www.omdbapi.com/?apikey=d777cf78&i=${movieId}`)
return theMovie.data
}

export default {
    getMovies,
    getMovieById
}