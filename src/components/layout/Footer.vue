<template>
  <v-footer v-if="!loading" class="pa-0">
    <v-row justify="center">
      <v-col cols="12" class="py-0">
        <v-card
          flat
          tile
          class="grey darken-4 white--text text-center"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-col cols="6" align="center">
                <div>
                  <img
                    height="45"
                    :src="getLogoUrl()"
                    alt="logo"
                    class="pt-3"
                  />
                </div>
                <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 mt-3 mb-2 white--text"
                  icon
                >
                  <v-icon size="24px">
                    {{ icon }}
                  </v-icon>
                </v-btn>
                <div class="white--text caption mt-2">
                  Designed and Developed by Hans Tanawi
                </div>
              </v-col>
              <v-col
                cols="6"
                align="center"
                class="py-3"
              >
                <p class="white--text">Powered by :</p>
                <v-img
                  class="logo mt-3 mb-5"
                  width="120px"
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                  alt=""
                />
                <a
                  class="link"
                  href="https://themoviedb.org/"
                  target="_blank"
                  style="text-decoration: none; color: white;"
                >
                  The Movie Database
                </a>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>FilmSeeker</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-github',
      ],
    };
  },
  methods: {
    getLogoUrl() {
      // eslint-disable-next-line global-require
      return require('../../assets/logo_white.png');
    },
  },
};
</script>

<style>

</style>
