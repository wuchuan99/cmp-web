import { SET_SEARCH_INFO } from "@/types/mutation-types";

const state = {
  // 查询时间
  searchTime: 0,
  // 查询总数
  searchTotal: 0
};

const getters = {};

const mutations = {
  [SET_SEARCH_INFO](state, payload) {
    state.searchTime = payload["took"] || 0;
    state.searchTotal = payload["totalCount"] || 0;
  }
};

const actions = {
  // 记录搜索时间和总数
  setSearchInfo({ commit }, val) {
    commit(SET_SEARCH_INFO, val);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
