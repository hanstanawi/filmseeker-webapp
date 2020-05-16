<template>
  <div class="movie-card">
    <v-card flat class="text-center ma-1 my-3 mx-auto card-style" max-width="400">
      <v-responsive class="pa-1">
        <v-img :src="moviePoster + movie.poster_path" class="movie-img" contain></v-img>
      </v-responsive>
      <v-card-text class="ma-0 card-text">
        <router-link class="title" tag="p" :to="{ name: 'MovieDetails', params: { id: movie.id } }">
            <span
            class="title font-weight-bold black--text"
          >{{ movie.title }} ({{ movieReleaseDate }})</span>
        </router-link>
        <span class="subtitle-1 font-weight-black black--text">
          <v-icon color="amber">mdi-star</v-icon>
          {{ movie.vote_average }}
        </span>
        <div v-for="genre in movie.genre" :key="genre">{{ genre }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['moviePoster', 'watchlist']),
    movieReleaseDate() {
      return this.movie.release_date.slice(0, 4);
    },
    checkRecord() {
      const record = this.watchlist.find((movie) => movie.id === this.movie.id);
      return !!record;
    },
  },
  methods: {
    addMovie() {
      console.log(this.movie);
      this.$store.dispatch('addMovie', this.movie);
    },
    removeMovie() {
      return this.$store.dispatch('removeMovie', this.movie);
    },
  },
};
</script>

<style scoped>
p .title {
cursor: pointer;
}

p .title:hover {
  text-decoration: underline;
}

.movie-img {
  height: 50vh;
}

</style>
