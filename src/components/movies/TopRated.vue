<template>
  <div>
    <movie-list
      :title="title"
      :movies="moviesList"
      :loading-movies="isLoading"
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
  name: 'TopRatedMovies',
  props: {
    moviesList: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MovieList,
  },
  data() {
    return {
      title: 'Top Rated Movies',
      page: 1,
    };
  },
  watch: {
    async page(val) {
      await this.fetchTopRatedMovies(val);
      this.toTop();
    },
  },
  methods: {
    ...mapActions({
      fetchTopRatedMovies: 'movies/fetchTopRatedMovies',
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
