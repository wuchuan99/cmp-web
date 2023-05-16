import { http } from "@/plugins/axios";

/**
 * 获取任务列表
 * @param {*} data
 * @returns
 */
export const getUserList = data => {
  return http({
    url: "cmp-usermanage/user/page",
    method: "post",
    data: data
  });
};

/**
 * 获取地区树形结构
 * @returns
 */
export const getTree = () => {
  return http({
    url: "cmp-usermanage/user/tree/region",
    method: "get"
  });
};

/**
 * 获取用户详情
 * @param {*} id
 * @returns
 */
export const getDetail = userId => {
  return http({
    url: `cmp-usermanage/user/detail/${userId}`,
    method: "get"
  });
};

/**
 * 创建用户
 * @param {*} data
 * @returns
 */
export const createUser = data => {
  return http({
    url: "cmp-usermanage/user/create",
    method: "post",
    data
  });
};

/**
 * 删除用户
 * @param {*} userId
 * @returns
 */
export const deleteUser = userId => {
  return http({
    url: `cmp-usermanage/user/delete/${userId}`,
    method: "delete"
  });
};

/**
 * 编辑用户
 * @param {*} data
 * @returns
 */
export const editUser = data => {
  return http({
    url: "cmp-usermanage/user/edit",
    method: "post",
    data
  });
};

/**
 * 重置密码
 * @param {*} data
 * @returns
 */
export const resetPassWord = userId => {
  return http({
    url: `cmp-usermanage/user/reset/${userId}`,
    method: "get"
  });
};

/**
 * 重置密码
 * @param {*} data
 * @returns
 */
export const setInitialPassWord = data => {
  return http({
    url: "cmp-usermanage/user/set/initialpassword",
    method: "post",
    data
  });
};

/**
 * 个人信息维护
 * @param {*} data
 * @returns
 */
export const userInfoMaintaining = data => {
  return http({
    url: "cmp-usermanage/user/maintaining",
    method: "put",
    data
  });
};
