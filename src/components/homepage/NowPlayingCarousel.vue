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
        <v-img
          :src="`${item.backdrop_path}`"
        >
        <v-row justify="end">
          <v-col align="end">
          {{ item.title }}
          </v-col>
        </v-row>
        </v-img>
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

<style>

</style>
