<template>
  <div>
    <series-list
      :title="title"
      :series="seriesList"
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
import SeriesList from '../reusable/SeriesList.vue';

export default {
  name: 'LatestSeries',
  props: {
    seriesList: {
      type: Array,
      required: true,
    },
  },
  components: {
    SeriesList,
  },
  data() {
    return {
      title: 'On Air Series',
      page: 1,
    };
  },
  watch: {
    async page(val) {
      await this.fetchOnAirSeries(val);
      this.toTop();
    },
  },
  methods: {
    ...mapActions({
      fetchOnAirSeries: 'series/fetchOnAirSeries',
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
