<template>
  <div class="series-card">
    <v-card
      flat
      class="text-center card-style"
      :class="`${ isHomepage ? 'mt-0 pt-0 mx-1 px-0' : 'ma-1 my-3 mx-auto'}`"
      :max-width="`${ isHomepage ? 200 : 400 }`"
    >
      <!-- Movie Poster -->
      <v-responsive class="pa-1">
        <v-img
          :src="series.poster_path"
          class="series-img"
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
          :to="{ name: 'SeriesDetails', params: { id: series.id } }"
        >
          <span class="title font-weight-bold black--text">
            {{ series.name }} ({{ seriesReleaseDate }})
          </span>
        </router-link>
        <span class="subtitle-1 font-weight-black black--text">
          <v-icon color="amber">mdi-star</v-icon>
          {{ series.vote_average }}
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SeriesCard',
  props: {
    series: {
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
      watchlist: 'watchlist/watchlist',
    }),
    seriesReleaseDate() {
      return this.series.first_air_date.slice(0, 4);
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

.series-img {
  height: 50vh;
}
</style>
