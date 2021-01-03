<template>
  <div class="watchlist">
    <v-container class="my-5 pa-5">
    <template v-if="watchlist.length > 0">
      <h1 class="title font-weight-bold">Your Watchlist</h1>
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
          <v-btn text color="grey" v-on="on" @click="sortDesc('vote_average')">
            <v-icon left small>mdi-star</v-icon>
            <span class="caption text-lowercase">By Rating</span>
          </v-btn>
        </template>
        <span>Sort List By Rating</span>
      </v-tooltip>
    </v-row>

    <!-- Movie Watchlist -->
      <v-card flat v-for="(item, index) in watchlist" :key="item.id">
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
              @click="removeMovie(item.id)"
              class="removeButton">
              <v-icon color="red darken-1">mdi-delete</v-icon>
            </v-btn>
           </div>
         </v-col>
       </v-row>
       <v-divider></v-divider>
     </v-card>
     </template>

      <!-- No Item -->
      <v-row v-else class="justify-center">
       <v-col cols="12" md="6" class="align-center">
         <p
         class="no-movie headline font-weight-medium">
         You haven't added any movies to your watchlist
         </p>
       </v-col>
     </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Watchlist',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      watchlist: 'watchlist/watchlist',
    }),
  },
  async mounted() {
    this.loading = true;
    await this.fetchWatchlistData();
    this.loading = false;
  },
  methods: {
    ...mapActions({
      removeMovie: 'watchlist/removeMovie',
      fetchWatchlistData: 'watchlist/fetchWatchlistData',
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

<style scoped>
.plot {
  text-align: justify;
  text-justify: inter-word;
}

.removeButton:hover {
  background-color: #EF9A9A;
}

p .title {
cursor: pointer;
}

p .title:hover {
  text-decoration: underline;
}

.no-result {
  text-align: center;
  color: #757575;
}
</style>
