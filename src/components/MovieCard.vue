<template>
  <div class="movie-card">
    <v-card text class="text-center ma-1 my-auto mx-auto" max-width="400">
      <v-responsive class="pa-4">
        <v-img :src="basePosterURL + movie.poster_path" height="300"></v-img>
      </v-responsive>
      <v-card-text class="ma-0">
        <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
          <div
            class="title font-weight-bold grey--text"
          >{{ movie.title }} ({{ movie.release_date }})</div>
        </router-link>
        <div class="grey--text" v-for="genre in movie.genre" :key="genre">{{ genre }}</div>
      </v-card-text>
      <v-row class="justify-center">
        <v-col class="align-center">
          <v-btn text color="grey">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  data() {
    return {
      basePosterURL: 'https://image.tmdb.org/t/p/w500',
    };
  },
  props: {
    movie: Object,
  },
};
</script>

<style scoped></style>
