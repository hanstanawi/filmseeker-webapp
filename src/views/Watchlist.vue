<template>
  <div class="about">
    <h1 class="title grey--text">Your Watchlist</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <MovieCard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'Watchlist',
  components: {
    MovieCard,
  },
};
</script>
