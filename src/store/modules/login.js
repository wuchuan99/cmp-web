/**
 * 登录相关
 */
import { SET_TOKEN } from "@/types/mutation-types";
import {
  btoa,
  atob,
  setSessionStorage,
  getSessionStorage
} from "@/utils/string";

const _token =
  "067d96fdae86d435be74888b7fc271f308dfcb9919b004e66676d53029553ef4bcd4cc8e1879e5e0fe291191e98f57a360124dedb939e3393a544ce5edfe4143";
const state = {
  // 用户token
  token: _token || atob(getSessionStorage(btoa("token"))),
  uploadHeader: {
    Authorization: _token || atob(getSessionStorage(btoa("token")))
  }
};

const getters = {
  token({ token }) {
    return token ? atob(token) : "";
  }
};

const mutations = {
  // 设置token
  [SET_TOKEN](state, payload) {
    state.token = payload;
    setSessionStorage(btoa("token"), btoa(payload));
  }
};

const actions = {
  // 设置token
  setToken({ commit }, val) {
    commit(SET_TOKEN, val);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
