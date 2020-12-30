<template>
  <div>
    <v-slide-group
      v-model="model"
      class="mx-5"
      active-class="success"
      :show-arrows="true"
      center-active
    >
      <v-slide-item
        v-for="item in movieItems"
        :key="item.id"
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
.v-slide-group:not(.v-slide-group--has-affixes) .v-slide-group__next {
display: flex;
}

</style>
