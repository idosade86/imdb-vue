<template>
  <div id="app">
    <div id="nav">
      <router-link class="imdb-title" to="/">Enjoy IMDb</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: #f4f7f6;
}

html{
  font-size: 20px;
}
.imdb-title {
  font-size: 30px;
  text-decoration: none;
  color: #33a09c;
  margin: 25px 0px 0px 15px;
}
</style>
