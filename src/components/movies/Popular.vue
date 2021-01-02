<template>
  <div>
    <movie-list
      :title="title"
      :movies="moviesList"
    />
    <v-row justify="center">
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="5"
            circle
            :color="'amber'"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MovieList from '../reusable/MovieList.vue';

export default {
  name: 'PopularMovies',
  props: {
    moviesList: {
      type: Array,
      required: true,
    },
  },
  components: {
    MovieList,
  },
  data() {
    return {
      title: 'Popular Movies',
      page: 1,
    };
  },
  watch: {
    async page(val) {
      await this.fetchPopularMovies(val);
      this.toTop();
    },
  },
  methods: {
    ...mapActions({
      fetchPopularMovies: 'movies/fetchPopularMovies',
    }),
    toTop() {
      return this.$vuetify.goTo(0, {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      });
    },
  },
};
</script>

<style>

</style>
