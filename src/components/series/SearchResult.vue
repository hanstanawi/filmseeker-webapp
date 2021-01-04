<template>
  <div>
    <v-container class="my-5">
      <div v-if="!loading">
        <h1 class="title">Search Result for: {{ query }}</h1>
        <!-- Movies List -->
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            v-for="series in searchResult"
            :key="series.id"
          >
            <SeriesCard :series="series" />
          </v-col>
        </v-row>
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
import SeriesCard from '../reusable/SeriesCard.vue';

export default {
  name: 'SeriesSearchResult',
  components: {
    SeriesCard,
  },
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    async query(val) {
      this.loading = true;
      await this.fetchSearchQuery(val);
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({
      searchResult: 'series/searchResult',
    }),
  },
  async mounted() {
    this.loading = true;
    await this.fetchSearchQuery(this.query);
    this.loading = false;
  },
  methods: {
    ...mapActions({
      fetchSearchQuery: 'series/fetchSearchQuery',
    }),
  },
};
</script>

<style scoped>
.loading-bar {
  transform: translate(0, 250%);
}
</style>
