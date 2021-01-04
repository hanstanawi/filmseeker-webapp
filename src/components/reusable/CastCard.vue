<template>
  <div class="cast-card">
    <v-card
      flat
      class="text-center card-style mt-0 pt-0 mx-1 px-0"
      :max-width="150"
    >
      <v-responsive class="pa-1">
        <v-img
          :src="cast.profile_path"
          class="cast-img"
        />
      </v-responsive>

      <!-- Movie Info -->
      <v-card-text
        class="ma-0 card-text"
      >
        <div class="subtitle-1 font-weight-bold black--text">
          {{ cast.name }}
        </div>
        <span class="subtitle-1 black--text">
          {{ cast.character }}
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CastCard',
  props: {
    cast: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
p .title {
  cursor: pointer;
}

p .title:hover {
  text-decoration: underline;
}

.cast-img {
  height: 100%;
}
</style>
