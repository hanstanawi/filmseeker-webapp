<template>
  <nav>
    <v-app-bar flat app>
      <!-- Open Drawer -->
      <v-app-bar-nav-icon
        class="grey--text"
        @click="openDrawer = !openDrawer"
      ></v-app-bar-nav-icon>
      <!-- Logo -->
      <v-toolbar-title class="grey--text text-uppercase">
        <v-icon left>mdi-film</v-icon>
        <span class="font-weight-light">Film</span>
        <span>Seeker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Nav Items -->
      <v-btn
      v-for="link in links"
      :key="link.label"
      text
      :to="link.url"
      class="grey--text">
      <v-icon left small>{{ link.icon }}</v-icon>
      {{ link.label }}
      </v-btn>
    </v-app-bar>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app color="cyan lighten-1" v-model="openDrawer">
      <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.label"
            route
            :to="link.url"
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
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
          label: 'Your Watchlist',
          url: '/watchlist',
          icon: 'mdi-star',
        },
      ],
      openDrawer: false,
    };
  },
};
</script>

<style>

</style>
