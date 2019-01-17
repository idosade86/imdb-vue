<template>
  <div>
    <div>
      <router-link class="btn-back" to="/">Go Back</router-link>
    </div>
    <h2>Details</h2>
    <div v-if="this.pickedMovie" class="det-container flex justify-space-around">
      <img :src="this.pickedMovie.Poster">
      <div calss="info-container">
        <p>
          <b>Titel:</b>
          {{this.pickedMovie.Title}}
        </p>
        <p>
          <b>Year:</b>
          {{this.pickedMovie.Year}}
        </p>
        <p>
          <b>Director:</b>
          {{this.pickedMovie.Director}}
        </p>
        <p>
          <b>Awards:</b>
          {{this.pickedMovie.Awards}}
        </p>
        <p>
          <b>imdbRating:</b>
          {{this.pickedMovie.imdbRating}}
        </p>
        <p>
          <b>Production:</b>
          {{this.pickedMovie.Production}}
        </p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "MoviePreview",
  data() {
    return {
      pickedMovie: null
    };
  },
  created() {
    console.log(this.$route.params.imdbID);
    let movieId = this.$route.params.imdbID;
    this.$store.dispatch({ type: "getMovieById", movieId }).then(res => {
      console.log("res", res);
      this.pickedMovie = res;
    });
  }
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
}

.btn-back {
  text-decoration: none;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 2px;
  transition: 0.4s;
  float: right;
  margin-right: 10px;
  color: white;
  background: rgb(207, 200, 200);
}

.btn-back:hover {
  color: #b3b3b3;
  background: rgb(238, 235, 235);
}

.det-container {
  image {
    margin-right: 26px;
    width: 400px;
  }
}

@media only screen and (max-width: 830px) {
  .det-container {
    flex-direction: column;
    image {
      margin: 0;
      object-fit: cover;
      width: 80%;
    }
  }
}
</style>
