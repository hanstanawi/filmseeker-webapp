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
        v-for="item in seriesItems"
        :key="item.id"
      >
        <series-card
          :series="item"
          :is-homepage="true"
        />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import SeriesCard from './SeriesCard.vue';

export default {
  name: 'SeriesGroupItems',
  props: {
    seriesItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    SeriesCard,
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
