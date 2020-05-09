<template>
  <div class="details">
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.overview}}</p>
    <div class="genres" v-for="genre in movie.genres" :key="genre.id">
      <p>{{ genre.name }}</p>
    </div>
    <p>Rating: {{ movie.vote_average }}</p>
    <p>Runtime: {{ movie.runtime }} mins</p>
    <img :src="basePosterURL + movie.poster_path">
  </div>
</template>

<script>
export default {
  name: 'MovieDetails',
  data() {
    return {
      basePosterURL: 'https://image.tmdb.org/t/p/w500',
    };
  },
  props: ['movie'],
};
</script>

<style>

</style>
