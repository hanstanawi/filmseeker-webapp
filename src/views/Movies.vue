<template>
  <div class="home">
    <h1>Movies Page</h1>
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
