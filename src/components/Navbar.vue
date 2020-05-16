<template>
  <nav>
    <v-app-bar flat app color="grey darken-4">
      <!-- Open Drawer -->
      <v-app-bar-nav-icon
        class="grey--text"
        @click="openDrawer = !openDrawer"
      ></v-app-bar-nav-icon>
      <!-- Brand Icon -->
      <router-link tag="div" class="brand" to="/">
        <v-toolbar-title class="grey--text text-uppercase">
        <img height="40" :src="getLogoUrl()" alt="logo" class="pt-3">
      </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <!-- Nav Items -->

      <v-toolbar-items class="hidden-xs-only">
        <!-- Movie Button -->
        <v-btn
        text
        :to="'/'"
        class="white--text">
          <v-icon left small color="amber">mdi-movie</v-icon>
          Movies
        </v-btn>

        <!-- Watchlist Button -->
        <v-btn
        text
        :to="'/watchlist'"
        class="white--text">
        <v-icon left small color="amber">mdi-plus</v-icon>
          <v-badge color="amber darken-1"
          :content="listLength"
          inline
          v-if="listLength">
          Watchlist
          </v-badge>
          <span v-if="!listLength">Watchlist</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Navigation Drawer -->

    <v-navigation-drawer app color="grey darken-4" v-model="openDrawer" class="hidden-md-only">
      <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.label"
            route
            :to="link.url"
          >
            <v-list-item-action>
              <v-icon color="amber">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle class="white--text">{{
              link.label
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

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
      openDrawer: false,
    };
  },
  computed: {
    ...mapGetters(['listLength']),
  },
  methods: {
    getLogoUrl() {
      // eslint-disable-next-line global-require
      return require('../assets/logo_white.png');
    },
  },
};
</script>

<style scoped>
.brand {
  cursor: pointer;
}
</style>
