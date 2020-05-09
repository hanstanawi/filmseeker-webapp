<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4 mb-4 mt-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>
