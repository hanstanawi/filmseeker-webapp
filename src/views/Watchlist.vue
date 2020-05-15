<template>
  <div class="about">
    <v-container class="ma-5">
      <h1 class="title grey--text">Your Watchlist</h1>
      <v-row justify="center" align="center">
        <v-col cols="12" justify="center">
          <v-card flat>
            <WatchlistItem v-for="movie in watchlist" :key="movie.id" :movie="movie"/>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WatchlistItem from '@/components/WatchlistItem.vue';

export default {
  name: 'Watchlist',
  components: {
    WatchlistItem,
  },
  computed: {
    ...mapGetters(['watchlist', 'moviePoster']),
  },
};
</script>

<style scoped>
</style>
