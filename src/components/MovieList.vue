<template>
  <div class="hello">
    <form class="serach-container" @submit.prevent="setFilter">
      <h3>Search For Movie</h3>
      <input type="text" v-model="filter.byName" placeholder="Insert Movie Name">
      <!--  @input="this.setFilter" -->
      <button>Serach</button>
      <p v-if="isTreeChar">Please type at least 3 characters</p>
    </form>
    <ul class="movies-container flex wrap justify-content-center">
      <li class="movie-item" v-for="movie in moviesToDisplay" :key="movie.imdbID">
        <img v-bind:src="movie.Poster">
        <div class="btns-container flex justify-flex-end">
          <a class="btn-details" v-bind:href="`https://www.imdb.com/title/${movie.imdbID}/`">IMDb</a>
          <router-link class="btn-details" v-bind:to="`/MoviePreview/${movie.imdbID}`">More Details</router-link>
        </div>
      </li>
    </ul>
    <router-view/>
    <div class="btns-list" v-if="this.currentMoviePage">
      <button @click="nextPage" v-bind:class="{ loadMore: isActive}">Load More</button>
      <button @click="topOfList">Top of the list</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "MovieList",
  data() {
    return {
      filter: {
        byName: "",
        pageNum: 1
      },
      isMoreMovies: false,
      isTreeChar: false
    };
  },

  methods: {
    setFilter(ev) {
      if (this.filter.byName.length < 3) {
        this.isTreeChar = true;
        return;
      }

      this.isTreeChar = false;
      if (ev) {
        this.isMoreMovies = false;
        this.filter.pageNum = 1;
      }
      if (this.filter.byName.length > 2) {
        this.$store.dispatch({
          type: "getMovies",
          filter: this.filter,
          isMoreMovies: this.isMoreMovies
        });
      }
    },

    nextPage() {
      this.filter.pageNum += 1;
      this.isMoreMovies = true;
      this.setFilter();
    },

    topOfList() {
      $(document).ready(function() {
        $("html").animate({ scrollTop: 0 }, "slow");
      });
    }
  },
  computed: {
    moviesToDisplay() {
      return this.$store.getters.getMovies;
    },
    currentMoviePage() {
      return this.$store.getters.getcurrentMoviePage;
    },
    isActive() {
      console.log("im hrer");
      return this.currentMoviePage.length < 10;
    }
  }
};
</script>

<style scoped lang="scss">
.serach-container {
  text-align: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: #f4f7f6;
  padding-bottom: 25px;

  h3 {
    margin: 0;
    margin-bottom: 18px;
    margin-top: 30px;
    color: #bdbdbd;
  }
  input {
    font-size: 1rem;
    height: 30px;
    width: 300px;
  }
  button {
    font-size: 1rem;
    height: 36px;
    width: 115px;
    background: burlywood;
    border: 1px solid gray;
    transition: 0.4s;
  }

  button:hover {
    cursor: pointer;
    color: white;
    background-color: rgb(207, 200, 200);
  }
}

.movies-container {
  padding: 0;
}

.movie-item {
  height: 320px;
  width: 29%;
  list-style: none;
  margin: 20px;
  background-color: #fcfcfc;
  padding-bottom: 20px;
  box-shadow: 0px 0px 10px 0.2px;
  border-radius: 5px;

  img {
    object-fit: cover;
    width: 100%;
    height: 250px;
    border-radius: 5px 5px 0 0;
    transition: 0.3s;
  }

  img:hover {
    cursor: pointer;
  }

  .btn-details {
    text-decoration: none;
    padding: 5px;
    color: #b3b3b3;
    border: 1px solid #ccc;
    border-radius: 2px;
    transition: 0.4s;
    margin-left: 5px;
  }

  .btn-details:hover {
    color: white;
    background: rgb(207, 200, 200);
  }

  .btns-container {
    margin-right: 10px;
    margin-top: 40px;
  }
}
.btns-list {
  text-align: center;
  padding: 20px;
  text-align: center;
  button {
    height: 40px;
    width: 180px;
    padding: 5px;
    color: #8a8888;
    border: 1px solid #ccc;
    background: rgb(240, 236, 236);
    border-radius: 5px;
    transition: 0.4s;
    margin-left: 10px;
  }
  button:hover {
    cursor: pointer;
    color: white;
    background: rgb(146, 143, 143);
  }
  .loadMore {
    background-color: rgb(219, 102, 87);
    color: white;
  }
}

@media only screen and (max-width: 500px) {
  .movie-item {
    width: 80%;
  }

  .serach-container {
    padding: 10px;
    input {
      width: 180px;
    }
  }

  button {
    margin: 10px 0;
  }
}
</style>
