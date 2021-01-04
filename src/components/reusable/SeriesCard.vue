<template>
  <div class="series-card">
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        class="text-center card-style"
        :class="`${ isHomepage ? 'mt-0 pt-0 mx-1 px-0' : 'ma-1 my-3 mx-auto'}`"
        :max-width="`${ isHomepage ? 200 : 400 }`"
      >
        <!-- Series Card Poster Homepage -->
        <router-link
          v-if="isHomepage"
          :to="{ name: 'SeriesDetails', params: { id: series.id } }"
          tag="div"
          style="cursor: pointer"
        >
          <v-responsive class="pa-1">
            <v-img
              :src="series.poster_path"
              class="series-img overlay"
              contain
              :class="{ 'on-hover': hover }"
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

        <!-- Series Card Poster -->
        <v-responsive
          class="pa-1"
          v-if="!isHomepage"
        >
            <v-img
              :src="series.poster_path"
              class="series-img overlay"
              contain
              :class="{ 'on-hover': hover }"
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
    </v-hover>
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

.overlay {
  transition: filter 0.4s ease-in-out;
  filter: brightness(70%);
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
