import config from "../config";

/**
 * 用户权限
 */
export const init = () => {
  config.register("permission", {
    admin: {},
    operater: {},
    sysadmin: {}
  });
};

export const getPermissionRole = role => config.get("permission")[role];
