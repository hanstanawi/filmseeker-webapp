<template>
 <div>
   <v-container class="my-5">
     <div v-if="!loading">
      <on-air
        v-if="isOnAirSeries"
        :series-list="onAirSeries"
       />

      <popular
        v-if="isPopularSeries"
        :series-list="popularSeries"
      />

      <top-rated
        v-if="isTopRatedSeries"
        :series-list="topRatedSeries"
      />
     </div>
     <v-row v-else justify="center">
        <v-col cols="12" align="center">
          <v-progress-circular
            class="loading-bar"
            indeterminate
            color="amber"
            size="100"
            width="10"
          />
        </v-col>
      </v-row>
   </v-container>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OnAir from '../components/series/OnAir.vue';
import Popular from '../components/series/Popular.vue';
import TopRated from '../components/series/TopRated.vue';

export default {
  name: 'TVSeries',
  components: {
    OnAir,
    Popular,
    TopRated,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      onAirSeries: 'series/onAirSeries',
      topRatedSeries: 'series/topRatedSeries',
      popularSeries: 'series/popularSeries',
    }),
    isOnAirSeries() {
      return this.$route.path.includes('on-air');
    },
    isTopRatedSeries() {
      return this.$route.path.includes('top-rated');
    },
    isPopularSeries() {
      return this.$route.path.includes('popular');
    },
  },
  async mounted() {
    this.loading = true;
    await this.fetchOnAirSeries();
    await this.fetchPopularSeries();
    await this.fetchTopRatedSeries();
    this.loading = false;
  },
  methods: {
    ...mapActions({
      fetchOnAirSeries: 'series/fetchOnAirSeries',
      fetchPopularSeries: 'series/fetchPopularSeries',
      fetchTopRatedSeries: 'series/fetchTopRatedSeries',
    }),
  },

};
</script>

<style scoped>
.loading-bar {
  transform: translate(0, 250%);
}
</style>
