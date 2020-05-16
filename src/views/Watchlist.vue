<template>
  <div class="watchlist">
    <v-container class="my-5 pa-5">
    <template v-if="watchlist > 0">
    <h1 class="title">Your Watchlist</h1>

    <!-- Sort buttons -->
     <v-row class="mb-3">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn small text color="grey" v-on="on" @click="sortAsc('title')">
            <v-icon left small>mdi-folder</v-icon>
            <span class="caption text-lowercase">By Movie Title</span>
          </v-btn>
        </template>
        <span>Sort Projects By Movie Title</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn small text color="grey" v-on="on" @click="sortDesc('vote_average')">
            <v-icon left small>mdi-account</v-icon>
            <span class="caption text-lowercase">By Rating</span>
          </v-btn>
        </template>
        <span>Sort Projects By Rating</span>
      </v-tooltip>
    </v-row>

    <!-- Movie Watchlist -->
     <v-card flat v-for="(movie, index) in watchlist" :key="movie.id">
       <v-row class="pa-3 project">
         <v-col cols="12" sm="4" md="2" class="justify-start">
           <v-avatar class="ma-3" size="180" tile>
              <v-img contain :src="moviePoster + movie.poster_path"></v-img>
            </v-avatar>
         </v-col>
         <v-col cols="12" sm="8">
          <router-link
          class="title"
          tag="p"
          :to="{ name: 'MovieDetails', params: { id: movie.id } }">
            <div class="title font-weight-bold mb-2">{{ index + 1 }}. {{ movie.title }}</div>
          </router-link>
          <div>
             <span class="font-weight-bold">Rating: </span>
             <span>
               <v-icon color="amber">mdi-star</v-icon>
             </span>
             {{ movie.vote_average }}
          </div>
          <div>
             <span class="font-weight-bold">Release Date: </span>
             {{ movie.release_date }}
          </div>
           <div class="plot">
             <span class="font-weight-bold">Synopsis: </span>
             {{ movie.overview }}
            </div>
         </v-col>
         <v-col cols="12" md="2" class="justify-center align-center">
           <div class="text-right">
            <v-btn outlined color="red darken-1" @click="removeMovie(movie)">
              <v-icon color="red darken-1">mdi-delete</v-icon>
            </v-btn>
           </div>
         </v-col>
       </v-row>
       <v-divider></v-divider>
     </v-card>
     </template>

     <v-row v-else>
       <v-col cols="12">
         <h1>No movies</h1>
       </v-col>
     </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Watchlist',
  computed: {
    ...mapGetters(['watchlist', 'moviePoster']),
  },
  methods: {
    removeMovie(movie) {
      return this.$store.dispatch('removeMovie', movie);
    },
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

p .title {
cursor: pointer;
}

p .title:hover {
  text-decoration: underline;
}

</style>
