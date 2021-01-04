<template>
  <div>
    <v-container class="my-5 pa-5">
      <template v-if="reviews.length > 0">
        <h1 class="title font-weight-bold">Your Reviews</h1>
        <!-- Sort buttons -->
        <v-row class="mb-3">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text color="grey" v-on="on" @click="sortAsc('title')">
                <v-icon left small>mdi-movie</v-icon>
                <span class="caption text-lowercase">By Movie Title</span>
              </v-btn>
            </template>
            <span>Sort List By Movie Title</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text color="grey" v-on="on" @click="sortDesc('rating')">
                <v-icon left small>mdi-star</v-icon>
                <span class="caption text-lowercase">By Rating</span>
              </v-btn>
            </template>
            <span>Sort List By Rating</span>
          </v-tooltip>
        </v-row>

            <!-- Movie Watchlist -->
          <v-card flat v-for="(item, index) in reviews" :key="item._id">
            <v-row class="pa-3 project">

              <!-- Item Poster -->
              <v-col cols="12" sm="4" md="2" class="justify-start">
                <v-avatar class="ma-3" size="180" tile>
                  <v-img contain :src="item.poster_path"></v-img>
                </v-avatar>
              </v-col>

              <!-- Item Info -->
              <v-col cols="12" sm="8">
                <router-link
                class="title"
                tag="p"
                :to="{
                  name: item.isMovie ? 'MovieDetails' : 'SeriesDetails',
                  params: { id: item.id }
                }">
                  <div class="title font-weight-bold mb-2">
                    {{ index + 1 }}. {{ item.title }}
                  </div>
                </router-link>
                <div>
                  <span class="font-weight-bold">Rating: </span>
                  <span>
                    <v-icon color="amber">mdi-star</v-icon>
                  </span>
                  {{ item.vote_average }}
                </div>
                <div>
                  <span class="font-weight-bold">Release Date: </span>
                  {{ item.release_date }}
                </div>
                <div class="plot">
                  <span class="font-weight-bold">Synopsis: </span>
                  {{ item.overview }}
                  </div>
              </v-col>

              <!-- Remove Action -->
              <v-col
                cols="12"
                md="2"
                class="justify-center align-center"
              >
                <div class="text-right">
                  <v-btn
                    outlined
                    color="red darken-1"
                    @click="removeReview(item._id)"
                    class="removeButton">
                    <v-icon color="red darken-1">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-col>
          </v-row>
          <v-divider />
        </v-card>
      </template>
    </v-container>
  </div>
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
