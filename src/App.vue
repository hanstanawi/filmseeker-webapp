<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4 mb-4 mt-5">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
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
