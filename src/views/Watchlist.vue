<template>
  <div class="about">
    <v-container class="ma-5">
      <h1 class="title grey--text">Your Watchlist</h1>
      <v-row justify="center" align="center">
        <v-col cols="12" v-for="movie in watchlist" :key="movie.id" justify="center">
            <v-card max-width="450">
              <router-link
              tag="p"
              class="title"
              :to="{ name: 'MovieDetails', params: { id: movie.id } }"
              >
                <div class="d-flex flex-wrap justify-start">
                  <img height="180" :src="moviePoster + movie.poster_path">
                  <div class="justify-center">
                    <v-card-title
                      class="title"
                      v-text="`${movie.title} (${movie.release_date.slice(0, 4)})`"
                    ></v-card-title>
                    <v-card-subtitle v-text="movie.vote_average"></v-card-subtitle>
                  </div>
                </div>
              </router-link>
              <v-card-actions>
                <v-btn text color="grey" @click="removeMovie(movie)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Watchlist',
  computed: {
    ...mapGetters(['watchlist', 'moviePoster']),
  },
  methods: {
    removeMovie(movie) {
      return this.$store.dispatch('removeMovie', movie);
    },
  },
};
</script>

<style scoped>
.title {
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}
</style>
