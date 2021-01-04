<template>
  <div>
    <v-slide-group
      v-model="model"
      class="ml-5"
      active-class="success"
      show-arrows
      center-active
    >
      <v-slide-item
        v-for="item in movieItems"
        :key="item.id"
        class="py-5"
      >
        <movie-card
          :movie="item"
          :is-homepage="true"
        />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
  name: 'MovieGroupItems',
  props: {
    movieItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    MovieCard,
  },
  data() {
    return {
      model: '',
    };
  },
};
</script>

<style>

</style>
