/**
 * 国际化
 * this.$t('message')
 * $root.$i18n.locale = 'zh'
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./zh";
import en from "./en";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import ElementLocale from "element-ui/lib/locale";

Vue.use(VueI18n);

const messages = {
  en: { ...en, ...enLocale },
  zh: { ...zh, ...zhLocale }
};

const i18n = new VueI18n({
  // locale存放到localStorage
  locale: "zh",
  fallbackLocale: "zh",
  messages: messages
});
// element组件国际化
ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
