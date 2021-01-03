/* eslint-disable no-shadow */
import authService from '@/api/authAPI';
import apiClient from '@/api/axios';

const state = {
  userId: null,
  token: null,
};

const getters = {
  loggedIn(state) {
    return !!(state.userId && state.token);
  },
};

const mutations = {
  SET_USER_DATA(state, userData) {
    state.userId = userData.userId;
    state.token = userData.token;
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('token', userData.token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
  },
  CLEAR_USER_DATA() {
    state.userId = null;
    state.token = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    apiClient.defaults.headers.common.Authorization = null;
  },
};

const actions = {
  async signup({ commit }, userData) {
    try {
      const response = await authService.signup(userData);
      const { token, userId } = response.data;
      commit('SET_USER_DATA', {
        token,
        userId,
      });
    } catch (err) {
      const error = new Error(err || 'Failed to signup');
      throw error;
    }
  },
  async login({ commit }, userData) {
    try {
      const response = await authService.login(userData);
      const { token, userId } = response.data;
      commit('SET_USER_DATA', {
        token,
        userId,
      });
    } catch (err) {
      const error = new Error(err || 'Failed to login');
      throw error;
    }
  },
  logout({ commit }) {
    commit('CLEAR_USER_DATA');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
