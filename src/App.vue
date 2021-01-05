<template>
  <v-app>
    <Navbar />
    <v-main>
      <transition
        name="slide"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from '@/components/layout/Navbar.vue';
import apiClient from '@/api/axios';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
  async created() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      const userData = {
        userId,
        token,
      };
      this.$store.commit('auth/SET_USER_DATA', userData);
      await this.fetchWatchlistData();
    }
    apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch('auth/logout');
        }
        return Promise.reject(error);
      },
    );
  },
  methods: {
    ...mapActions({
      fetchWatchlistData: 'watchlist/fetchWatchlistData',
    }),
  },
};
</script>

<style scoped>
.slide-enter-active {
animation: slide-in 0.2s ease-out forwards;
}

.slide-leave-active {
animation: slide-out 0.2s ease-out forwards;
}

@keyframes slide-in {
from {
transform: translateY(-30px);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}

@keyframes slide-out {
from {
transform: translateY(0);
opacity: 1;
}
to {
transform: translateY(-30px);
opacity: 0;
}
}
</style>
