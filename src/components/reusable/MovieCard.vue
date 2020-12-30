<template>
  <div class="movie-card">
    <v-card
      flat
      class="text-center card-style"
      :class="`${ isHomepage ? 'mt-0 pt-0 mx-1 px-0' : 'ma-1 my-3 mx-auto'}`"
      :max-width="`${ isHomepage ? 200 : 400 }`"
    >
      <!-- Movie Poster -->
      <v-responsive class="pa-1">
        <v-img
          :src="movie.poster_path"
          class="movie-img"
          contain
        />
      </v-responsive>

      <!-- Movie Info -->
      <v-card-text
        class="ma-0 card-text"
        v-if="!isHomepage"
      >
        <router-link
          class="title"
          tag="p"
          :to="{ name: 'MovieDetails', params: { id: movie.id } }"
        >
          <span class="title font-weight-bold black--text">
            {{ movie.title }} ({{ movieReleaseDate }})
          </span>
        </router-link>
        <span class="subtitle-1 font-weight-black black--text">
          <v-icon color="amber">mdi-star</v-icon>
          {{ movie.vote_average }}
        </span>
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
    isHomepage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      moviePoster: 'movies/moviePoster',
      watchlist: 'watchlist/watchlist',
    }),
    movieReleaseDate() {
      return this.movie.release_date.slice(0, 4);
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
