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
  name: 'NowPlaying',
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
      title: 'Now Playing Movies',
      page: 1,
    };
  },
  watch: {
    async page(val) {
      await this.fetchNowPlaying(val);
      this.toTop();
    },
  },
  methods: {
    ...mapActions({
      fetchNowPlaying: 'movies/fetchNowPlaying',
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
