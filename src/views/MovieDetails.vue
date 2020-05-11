<template>
  <div class="movie-details">
    <v-container class="pa-5">
      <v-row justify="center">
        <!-- Poster -->
        <v-col cols="12" sm="6" md="4" xl="2" class="px-0">
          <v-row justify="center">
            <img height="400" :src="moviePoster + movie.poster_path" />
          </v-row>
        </v-col>

        <!-- Content -->

        <v-col cols="12" sm="6" md="8" xl="10">
          <!-- Title  -->
          <h1 class="display-1 font-weight-bold">{{ movie.title }} ({{ movieReleaseDate }})</h1>
          <!-- Rating -->
          <p class="title font-weight-medium">
            <span>
              <v-icon color="amber">mdi-star</v-icon>
            </span>
          {{ movie.vote_average }}
          </p>
          <!-- Genre -->
          <v-row class="my-3 mr-0">
            <v-chip
            class="ma-2 d-flex-inline"
            color="grey lighten-1"
            v-for="genre in movie.genres"
            :key="genre.id">{{ genre.name }}
            </v-chip>
          </v-row>
          <p>Rating: {{ movie.vote_average }}</p>
          <p>Runtime: {{ movie.runtime }} mins</p>
          <p class="plot">{{ movie.overview }}</p>
          <v-btn text outlined color="grey" @click="addMovie" v-if="!checkRecord">
            <v-icon color="black" class="black--text mx-1">mdi-plus</v-icon>
            Add Movie
          </v-btn>
          <v-btn text color="grey" @click="removeMovie" v-else>
            <v-icon color="red" class="mx-1">mdi-delete</v-icon>
            Remove Movie
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieDetails',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['watchlist', 'moviePoster']),
    checkRecord() {
      const record = this.watchlist.find((movie) => movie.id === this.movie.id);
      return !!record;
    },
    movieReleaseDate() {
      return this.movie.release_date.slice(0, 4);
    },
  },
  methods: {
    addMovie() {
      return this.$store.dispatch('addMovie', this.movie);
    },
    removeMovie() {
      return this.$store.dispatch('removeMovie', this.movie);
    },
  },
};
</script>

<style scoped>
.plot {
  text-align: justify;
  text-justify: inter-word;
}
</style>
