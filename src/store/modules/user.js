import { SET_USER_INFO } from "@/types/mutation-types";

const state = {
  userInfo: {
    user: null, // 用户信息
    menu: [] //菜单
  }
};

const getters = {};

const mutations = {
  // 设置用户信息
  [SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  }
};

const actions = {
  setUserInfo({ commit }, val) {
    commit(SET_USER_INFO, val);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
