<template>
  <div class="movie-card">
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        class="text-center card-style"
        :class="[isHomepage ? 'mt-0 pt-0 mx-1 px-0' : 'ma-1 my-3 mx-auto']"
        :max-width="`${ isHomepage ? 200 : 400 }`"
      >
        <!-- Movie Poster -->
        <router-link
          v-if="isHomepage"
          :to="{ name: 'MovieDetails', params: { id: movie.id } }"
          tag="div"
          style="cursor: pointer"
        >
          <v-responsive class="pa-1">
            <v-img
              :src="movie.poster_path"
              class="movie-img overlay"
              :class="{ 'on-hover': hover }"
              contain
            >
              <div
                class="align-self-center info-hover"
                :class="{ 'on-hover': hover }"
              >
                <v-row
                  justify="center"
                  style="transform: translateY(250%)"
                >
                  <v-col cols="5" align="center">
                    <v-btn
                      :class="{ 'show-btns': hover }"
                      color="white"
                      icon
                    >
                      <v-icon
                        :class="{ 'show-btns': hover }"
                        color="white"
                      >
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="5" align="center">
                    <v-btn
                      :class="{ 'show-btns': hover }"
                      color="white"
                      icon
                    >
                      <v-icon
                        :class="{ 'show-btns': hover }"
                        color="white"
                      >
                        mdi-star
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-img>
          </v-responsive>
        </router-link>

        <v-responsive class="pa-1" v-if="!isHomepage">
          <v-img
            :src="movie.poster_path"
            class="movie-img overlay"
            :class="{ 'on-hover': hover }"
            contain
          >
            <div
              class="align-self-center info-hover"
              :class="{ 'on-hover': hover }"
            >
              <v-row
                justify="center"
                style="transform: translateY(250%)"
              >
                <v-col cols="5" align="center">
                  <v-btn
                    :class="{ 'show-btns': hover }"
                    color="white"
                    icon
                  >
                    <v-icon
                      :class="{ 'show-btns': hover }"
                      color="white"
                    >
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="5" align="center">
                  <v-btn
                    :class="{ 'show-btns': hover }"
                    color="white"
                    icon
                  >
                    <v-icon
                      :class="{ 'show-btns': hover }"
                      color="transparent"
                    >
                      mdi-star
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-img>
        </v-responsive>

        <!-- Movie Info -->
        <v-card-text
          class="ma-0 card-text"
        >
          <router-link
            class="title"
            tag="p"
            :to="{ name: 'MovieDetails', params: { id: movie.id } }"
          >
            <span class="title font-weight-bold black--text">
              {{ movie.title }} ({{ movieReleaseDate }})
            </span>
          </router-link>
          <span class="subtitle-1 font-weight-black black--text" v-if="!isHomepage">
            <v-icon color="amber">mdi-star</v-icon>
            {{ movie.vote_average }}
          </span>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieCard',
  props: {
    movie: {
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
      moviePoster: 'movies/moviePoster',
      watchlist: 'watchlist/watchlist',
    }),
    movieReleaseDate() {
      return this.movie.release_date.slice(0, 4);
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

.movie-img {
  height: 100%;
}

.overlay {
  transition: filter 0.4s ease-in-out;
  filter: brightness(75%);
}

.overlay:not(.on-hover) {
  filter: brightness(100%);
}

.info-hover {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.info-hover:not(.on-hover) {
  opacity: 0;
}

.show-btns {
  color:white !important;
}

</style>
