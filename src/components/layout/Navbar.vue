<template>
  <nav>
    <v-app-bar flat app color="grey darken-4" clipped-left clipped-right>
      <!-- Open Drawer -->
      <v-app-bar-nav-icon
        class="amber--text"
        @click="openDrawer = !openDrawer"
      />
      <!-- Brand Icon -->
      <router-link tag="div" class="brand mr-5" to="/">
        <v-toolbar-title class="grey--text text-uppercase">
          <img height="40" :src="getLogoUrl()" alt="logo" class="pt-3" />
        </v-toolbar-title>
      </router-link>
      <!-- Nav Items -->
      <v-toolbar-items class="hidden-xs-only">
        <!-- Movie Button -->
        <v-btn text :to="'/movies/now-playing'" class="white--text">
          <v-icon left small color="amber">mdi-movie</v-icon>
          Movies
        </v-btn>
        <!-- TV Series Button -->
        <v-btn text :to="'/series/on-air'" class="white--text">
          <v-icon left small color="amber">mdi-television-classic</v-icon>
          TV Series
        </v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <!-- SEARCH BAR -->
      <v-text-field
        v-if="isMovieSearch"
        v-model="searchTerm"
        flat
        outlined
        dense
        class="mt-6"
        placeholder="Search Your Favorite Movies"
        prepend-inner-icon="mdi-movie"
        background-color="white"
        @click:prepend-inner="isMovieSearch = false; searchTerm = null"
        clearable
        color="amber"
      >
        <template v-slot:append-outer>
          <router-link
            :to="{ name: 'MoviesSearch', params: { query: searchTerm } }"
            tag="button"
          >
            <v-icon color="amber">
              mdi-magnify
            </v-icon>
          </router-link>
        </template>
      </v-text-field>
      <v-text-field
        v-if="!isMovieSearch"
        v-model="searchTerm"
        flat
        outlined
        dense
        class="mt-6"
        placeholder="Search Your Favorite Series"
        prepend-inner-icon="mdi-television-classic"
        background-color="white"
        @click:prepend-inner="isMovieSearch = true; searchTerm = null"
        color="amber"
      >
        <template v-slot:append-outer>
          <router-link
            :to="{ name: 'SeriesSearch', params: { query: searchTerm } }"
            tag="button"
          >
            <v-icon color="amber">
              mdi-magnify
            </v-icon>
          </router-link>
        </template>
      </v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- Watchlist Button -->
        <v-btn
          v-if="isAuth"
          text
          :to="'/watchlist'"
          class="white--text"
        >
          <v-icon
            left
            small
            color="amber"
          >
            mdi-plus
          </v-icon>
          <v-badge
            color="amber darken-1"
            :content="listLength"
            inline
            v-if="listLength"
          >
            Watchlist
          </v-badge>
          <span v-if="!listLength">Watchlist</span>
        </v-btn>
        <v-btn
          text
          :to="'/login'"
          class="white--text"
          v-if="!isAuth"
        >
          <v-icon
            left
            small
            color="amber"
          >
            mdi-account
          </v-icon>
          Login
        </v-btn>
        <v-btn
          text
          class="white--text"
          v-if="isAuth"
          @click="logout"
        >
          <v-icon
            left
            small
            color="amber"
          >
            mdi-logout
          </v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Navigation Drawer -->

    <v-navigation-drawer
      app
      clipped
      width="186"
      color="grey darken-4"
      v-model="openDrawer"
      class="hidden-md-only"
    >
      <v-list>
        <template v-if="isMoviesPage">
          <v-list-item
            v-for="link in moviesPageLinks"
            :key="link.label"
            route
            :to="link.url"
          >
            <v-list-item-action>
              <v-icon color="amber">
                {{ link.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-subtitle class="white--text">
              {{ link.label }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
        <template v-else-if="isSeriesPage">
          <v-list-item
            v-for="link in seriesPageLinks"
            :key="link.label"
            route
            :to="link.url"
          >
            <v-list-item-action>
              <v-icon color="amber">
                {{ link.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-subtitle class="white--text">
              {{ link.label }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item
            v-for="link in links"
            :key="link.label"
            route
            :to="link.url"
          >
            <v-list-item-action>
              <v-icon color="amber">
                {{ link.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-subtitle class="white--text">
              {{ link.label }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          label: 'Movies',
          url: '/',
          icon: 'mdi-movie',
        },
        {
          label: 'Watchlist',
          url: '/watchlist',
          icon: 'mdi-plus',
        },
      ],
      moviesPageLinks: [
        {
          label: 'Now Playing',
          url: '/movies/now-playing',
          icon: 'mdi-movie-open',
        },
        {
          label: 'Popular',
          url: '/movies/popular',
          icon: 'mdi-star',
        },
        {
          label: 'Upcoming',
          url: '/movies/upcoming',
          icon: 'mdi-calendar',
        },
        {
          label: 'Top Rated',
          url: '/movies/top-rated',
          icon: 'mdi-trophy',
        },
      ],
      seriesPageLinks: [
        {
          label: 'On Air',
          url: '/series/on-air',
          icon: 'mdi-television-classic',
        },
        {
          label: 'Popular',
          url: '/series/popular',
          icon: 'mdi-star',
        },
        {
          label: 'Top Rated',
          url: '/series/top-rated',
          icon: 'mdi-trophy',
        },
      ],
      openDrawer: false,
      searchTerm: null,
      loading: false,
      isMovieSearch: true,
    };
  },
  watch: {
    isMoviesPage(val) {
      if (val) {
        this.openDrawer = true;
      } else {
        this.openDrawer = false;
      }
    },
    isSeriesPage(val) {
      if (val || this.isMoviesPage) {
        this.openDrawer = true;
      } else {
        this.openDrawer = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      listLength: 'watchlist/listLength',
      isAuth: 'auth/loggedIn',
    }),
    isMoviesPage() {
      return this.$route.path.includes('movie');
    },
    isSeriesPage() {
      return this.$route.path.includes('series');
    },
  },
  methods: {
    ...mapActions({
      fetchSearchQuery: 'movies/fetchSearchQuery',
      logout: 'auth/logout',
    }),
    getLogoUrl() {
      // eslint-disable-next-line global-require
      return require('../../assets/logo_white.png');
    },
  },
};
</script>

<style scoped>
.brand {
  cursor: pointer;
}
</style>
