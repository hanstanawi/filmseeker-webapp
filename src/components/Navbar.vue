<template>
  <nav>
    <v-app-bar flat app>
      <!-- Open Drawer -->
      <v-app-bar-nav-icon
        class="grey--text"
        @click="openDrawer = !openDrawer"
      ></v-app-bar-nav-icon>
      <!-- Logo -->
      <router-link tag="button" class="brand" to="/">
        <v-toolbar-title class="grey--text text-uppercase">
        <v-icon left>mdi-film</v-icon>
        <span class="font-weight-light">Film</span>
        <span>Seeker</span>
      </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- Nav Items -->
      <v-toolbar-items class="hidden-xs-only">
      <v-btn
      v-for="link in links"
      :key="link.label"
      text
      :to="link.url"
      class="grey--text">
      <v-icon left small>{{ link.icon }}</v-icon>
      <v-badge color="primary"
      v-if="listLength > 0 && link.label==='Watchlist'"
      :content="listLength">
      {{ link.label }}
      </v-badge>
      </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app color="cyan lighten-1" v-model="openDrawer" class="hidden-md-only">
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
          label: 'Watchlist',
          url: '/watchlist',
          icon: 'mdi-plus',
        },
      ],
      openDrawer: false,
    };
  },
  computed: {
    listLength() {
      return this.$store.getters.listLength;
    },
  },
};
</script>

<style scoped>
button .brand {
  border: none;
  padding: 0;
}
</style>
