<template>
  <div>
    <v-carousel
      height="90vh"
      hide-delimiters
      :continuous="true"
      :cycle="true"
      :show-arrows-on-hover="true"
      :max="5"
    >
      <v-carousel-item
        v-for="(item) in slicedListArrays"
        :key="item.id"
      >
        <div class="wrap">
          <v-img
            :src="`${item.backdrop_path}`"
          >
            <v-row class="text-overlay pr-0">
              <v-col class="content">
                <h4>Now Playing</h4>
                <router-link
                  :to="{ name: 'MovieDetails', params: { id: item.id } }"
                  tag="h3"
                >
                  <h1 style="cursor: pointer">{{ item.title }}</h1>
                </router-link>
                <h5>
                  Rating :
                  <span>
                    <v-icon small color="amber" class="pb-1">mdi-star</v-icon>
                  </span>
                  {{ item.vote_average }} | {{ item.original_language.toUpperCase() }}
                </h5>
              </v-col>
            </v-row>
          </v-img>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  date: 'NowPlayingCarousel',
  props: {
    nowPlayingMovies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    slicedListArrays() {
      return this.nowPlayingMovies.slice(0, 10);
    },
  },
};
</script>

<style scoped>
.wrap {
  position: relative;
}

.text-overlay {
  position: absolute;
  color: #fff;
  top: 0;
  left: 10px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.8) 10%,
    rgba(0, 0, 0, 0) 100%
  );
}

.content {
  margin: 0;
  position: absolute;
  top: 60%;
  left: 4%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding-left: 4rem;
}
</style>
