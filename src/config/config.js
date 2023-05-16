/**
 * 全局注册配置
 */
class Config {
  constructor() {
    this._config = {};
  }
  register(type, value) {
    this._config[type] = value;
  }
  get(type) {
    return this._config[type];
  }
  static getInstance() {
    if (!Config._instance) {
      Config._instance = new Config();
    }
    return Config._instance;
  }
}

export default Config.getInstance();
