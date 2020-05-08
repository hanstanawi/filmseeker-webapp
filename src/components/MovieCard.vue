<template>
  <div class="movie-card">
    <v-card text class="text-center ma-1 my-auto mx-auto" max-width="400">
      <v-responsive class="pa-4">
          <v-img :src="movie.posterLink" height="300"></v-img>
      </v-responsive>
      <v-card-text>
        <div class="subtitle-1">{{ movie.title }} ({{ movie.year }})</div>
        <div class="grey--text" v-for="genre in movie.genre" :key="genre">{{ genre }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="grey">
          <v-icon small left>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object,
  },
};
</script>

<style scoped>

</style>
