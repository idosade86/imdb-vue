import Vue from "vue";
import Vuex from "vuex";
import MovieService from '../src/services/MovieService.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    moviesToDisplay: null,
    currentMoviePage: null,
    filter: {
      byName: "",
      pageNum: 1
    },
  },
  mutations: {
    setMovies(state, { movies, isMoreMovies,payload }) {      
      state.filter = payload.filter
      // set it For deside to show "Load More" button
      state.currentMoviePage = movies.data.Search
      if (isMoreMovies) {
        movies.data.Search.forEach(movie => {
          state.moviesToDisplay.push(movie)
        });
      }
      else state.moviesToDisplay = movies.data.Search
    },
  },
  actions: {
    async getMovies({ state,commit }, payload) {
      console.log('state',state);
      var movies;
      if(state.filter.byName !== "") movies = await MovieService.getMovies(state.filter)
      else movies = await MovieService.getMovies(payload.filter)
      if (movies.data.Response === 'True') {
        commit({ type: 'setMovies', movies, isMoreMovies: payload.isMoreMovies, payload })
        return movies.data.Response
      }
      else return movies
    },
    async getMovieById(context, { movieId }) {
      var theMovie = await MovieService.getMovieById(movieId)
      console.log('theMovie',theMovie);
      return theMovie;
    }
  },
  getters: {
    getMovies: (state) => state.moviesToDisplay,
    getcurrentMoviePage: (state) => state.currentMoviePage
  }
});
