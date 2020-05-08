<template>
  <div class="movies">
    <h1 class="title grey--text">Movies Page</h1>
    <MovieCard />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
};
</script>
