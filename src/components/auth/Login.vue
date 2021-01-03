<template>
  <div>
    <v-img
      :src="'https://image.tmdb.org/t/p/w1280/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg'"
      class="image-overlay"
    >
      <v-row align="center">
        <v-col cols="12" align="center">
          <v-card
            max-width="500"
            class="px-6"
            style="transform: translateY(17%);"
          >
            <v-card-title>
              <v-img
                :src="getLogoUrl()"
                contain
                class="my-5"
                height="70"
              />
            </v-card-title>
            <v-card-text>
              <v-form v-model="isFormValid">
                <v-row dense no-gutters>
                  <v-col cols="12" class="my-0 py-0">
                    <v-text-field
                      v-model="email"
                      color="black"
                      prepend-inner-icon="mdi-email"
                      placeholder="Email Address"
                      outlined
                      dense
                      :rules="[emailRules, emailRequired]"
                    />
                  </v-col>
                </v-row>
                <v-row dense no-gutters>
                  <v-col cols="12" class="my-0 py-0">
                    <v-text-field
                      v-model="password"
                      color="black"
                      type="password"
                      prepend-inner-icon="mdi-lock"
                      placeholder="Password"
                      outlined
                      dense
                      :rules="[passwordRules]"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="my-0">
              <v-row justify="center" no-gutters dense>
                <v-col
                  cols="12"
                  align="center"
                  class="px-3"
                >
                  <v-btn
                    block
                    color="black"
                    class="white--text mb-4"
                    @click.prevent="loginUser"
                    :loading="loading"
                    @click="loader = 'loading'"
                    :disabled="!isFormValid"
                  >
                    <v-icon color="amber" class="mr-1">mdi-account</v-icon>
                    Login
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  align="center"
                  class="px-6 pt-0 mt-0 mb-6"
                >
                  <span class="mr-3">Don't have an account?</span>
                  <router-link
                    :to="{ name: 'Signup' }"
                  >
                    Sign up here
                  </router-link>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      emailRules: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(v) || 'Please enter a valid email',
      emailRequired: (v) => !!v || 'Email required',
      passwordRules: [
        (value) => !!value || 'Please type password.',
        (value) => (value && value.length >= 6) || 'minimum 6 characters',
      ],
      isFormValid: false,
    };
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async loginUser() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      try {
        this.loading = true;
        await this.login(userData);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
        this.$router.push({ name: 'Home' });
      }
    },
    getLogoUrl() {
      // eslint-disable-next-line global-require
      return require('../../assets/logo_black.png');
    },
  },
};
</script>

<style scoped>

.image-overlay {
  height: 91.5vh;
  width: 100%;
}

</style>
