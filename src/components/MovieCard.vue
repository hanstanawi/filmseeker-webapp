<template>
  <div class="movie-card">
    <v-card text class="text-center ma-1 my-auto mx-auto" max-width="400">
      <v-responsive class="pa-1">
        <v-img :src="moviePoster + movie.poster_path" height="350"></v-img>
      </v-responsive>
      <v-card-text class="ma-0">
        <router-link class="title" tag="p" :to="{ name: 'MovieDetails', params: { id: movie.id } }">
          <span
            class="title font-weight-bold black--text"
          >{{ movie.title }} ({{ movieReleaseDate }})</span>
        </router-link>
        <span class="subtitle-1">
          <v-icon color="amber">mdi-star</v-icon>
          {{ movie.vote_average }}
        </span>
        <div v-for="genre in movie.genre" :key="genre">{{ genre }}</div>
      </v-card-text>
      <v-card-actions>
        <v-row class="justify-center">
        <v-col class="align-center">
          <v-btn text color="grey" @click="addMovie" v-if="!checkRecord">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn text color="grey" @click="removeMovie" v-else>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      </v-card-actions>
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
</style>
