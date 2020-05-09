<template>
  <div class="about">
    <h1 class="title grey--text">Your Watchlist</h1>
    <div v-for="movie in watchlist" :key="movie.id">
      <router-link tag="a" :to="{ name: 'MovieDetails', params: { id: movie.id } }">
         <p>{{movie.title}}</p>
      </router-link>
      <span>
        <v-btn @click="removeMovie(movie)">Remove</v-btn>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Watchlist',
  computed: {
    watchlist() {
      return this.$store.getters.watchlist;
    },
  },
  methods: {
    removeMovie(movie) {
      return this.$store.dispatch('removeMovie', movie);
    },
  },
};
</script>
