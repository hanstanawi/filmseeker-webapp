<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserReviews',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      reviews: 'reviews/reviews',
    }),
  },
  async mounted() {
    this.loading = true;
    await this.fetchWatchlistData();
    this.loading = false;
  },
  methods: {
    ...mapActions({
      removeReview: 'reviews/removeMovie',
      fetchWatchlistData: 'reviews/fetchWatchlistData',
    }),
    // Sorting logic
    sortAsc(prop) {
      this.watchlist.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    sortDesc(prop) {
      this.watchlist.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
    },
  },
};
</script>

<style>

</style>
