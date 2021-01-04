<template>
  <div>
    <v-container class="pa-5 mt-10">
      <v-row
        justify="center"
        v-if="!loading"
      >
        <!-- Poster -->
        <v-col
          cols="12"
          sm="5"
          md="4"
          xl="2"
          class="px-0"
        >
          <v-row justify="center">
            <img
              class="movie-img"
              :src="series.details.poster_path ? series.details.poster_path : ''"
            />
          </v-row>
        </v-col>

        <!-- Content -->
        <v-col
          cols="12"
          sm="7"
          md="8"
          xl="10"
        >
          <!-- Title  -->
          <h1 class="display-1 font-weight-bold">
            {{ series.details.name }} ({{ seriesReleaseDate }})
          </h1>
          <!-- Rating -->
          <p class="title font-weight-black">
            <span>
              <v-icon color="amber darken-1">mdi-star</v-icon>
            </span>
            {{ series.details.vote_average }}
          </p>
          <!-- Genre -->
          <v-row class="my-3 mr-0">
            <v-chip
              class="ma-2 d-flex-inline black--text"
              color="amber darken-1"
              v-for="genre in series.details.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </v-chip>
          </v-row>
          <!-- Info -->
          <p>
            <span class="font-weight-bold">Release Date:</span>
            {{ series.details.first_air_date }}
          </p>
          <p>
            <span class="font-weight-bold">Number of Seasons:</span>
            {{ series.details.number_of_seasons }} Seasons
          </p>
          <p>
            <span class="font-weight-bold">Episode Run Time:</span>
            <span
              v-for="(time, index) in series.details.episode_run_time"
              :key="index"
            >
              {{ time }}
            </span>
            mins
          </p>
          <!-- Plot -->
          <p class="plot">{{ series.details.overview }}</p>
          <!-- Action Buttons -->
          <v-btn
            outlined
            color="black"
            @click="addSeriesToWatchlist"
            v-if="!checkRecord"
            class="add-button"
          >
            <v-icon color="black" class="mx-1">mdi-plus</v-icon>
            Add to Watchlist
          </v-btn>
          <v-btn
            outlined
            color="red darken-4"
            class="remove-button"
            @click.prevent="removeMovie(series.details.id)"
            v-else
          >
            <v-icon color="red darken-4" class="mx-1">mdi-delete</v-icon>
            Remove From Watchlist
          </v-btn>
        </v-col>
      </v-row>

      <!-- Loading Bar -->
      <v-row
        v-if="loading"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
          align="center"
        >
          <v-progress-circular
            class="loading-bar"
            indeterminate
            color="amber"
            size="100"
            width="10"
          />
        </v-col>
      </v-row>
      <!-- ERROR HANDLER -->
      <v-row v-if="errorHandler" class="justify-center">
        <v-col cols="12" md="8" class="align-center">
          <p class="error-handler headline font-weight-bold">
            <span>
              <v-icon>mdi-emoticon-sad-outline</v-icon>
            </span>
            Ooops! Something went wrong
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SeriesDetails',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      watchlist: 'watchlist/watchlist',
      errorHandler: 'movies/errorHandler',
      series: 'series/singleSeries',
    }),
    checkRecord() {
      // eslint-disable-next-line eqeqeq
      const record = this.watchlist.find((item) => item.id == this.series.details.id.toString());
      return !!record;
    },
    seriesReleaseDate() {
      return this.series.details.first_air_date.slice(0, 4);
    },
  },
  async mounted() {
    this.loading = true;
    await this.fetchSingleSeries(this.id);
    this.loading = false;
  },
  methods: {
    ...mapActions({
      addMovie: 'watchlist/addMovie',
      removeMovie: 'watchlist/removeMovie',
      fetchSingleSeries: 'series/fetchSingleSeries',
    }),
    async addSeriesToWatchlist() {
      const seriesItem = {
        id: this.series.details.id,
        title: this.series.details.name,
        overview: this.series.details.overview,
        release_date: this.series.details.first_air_date,
        vote_average: this.series.details.vote_average,
        poster_path: this.series.details.poster_path,
        isMovie: false,
      };
      await this.addMovie(seriesItem);
    },
  },
};
</script>

<style scoped>
.plot {
  text-align: justify;
  text-justify: inter-word;
}

.movie-img {
  min-height: 0;
  height: 425px;
}

.add-button:hover {
  background-color: #ffb300;
}

.remove-button:hover {
  background-color: #ef9a9a;
}

.loading-bar {
  transform: translate(0, 250%);
}

.error-handler {
  text-align: center;
  color: #757575;
}
</style>
