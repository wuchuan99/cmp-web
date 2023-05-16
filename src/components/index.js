/*
 * 公共组件注册
 * */
import Vue from "vue";
import Button from "./common/AppButton";
import Select from "./common/AppSelect";
import Cascade from "./common/AppCascade";
import DateTime from "./common/AppDateTimePicker";
import Progress from "./common/AppProgress";
import Table from "./common/AppTable";
import Page from "./common/AppPagination";
import Search from "./common/AppSearch";
import DropDown from "./common/AppDropdown";
import LeftMenu from "./common/AppLeftMenu";
import AdvancedSearchContainer from "./common/AppAdvancedSearchContainer";
import Drawer from "./common/AppDrawer";
import Tooltip from "./common/AppTooltip";
import Chart from "./common/echarts/chart.vue";
import Card from "./common/AppCard.vue";
import AppInputElement from "./common/AppInputElement.vue";
import AnimatedNumber from "./common/AppAnimatedNumber";

Vue.use({
  install: Vue => {
    Vue.component("new-button", Button);
    Vue.component("new-select", Select);
    Vue.component("new-cascade", Cascade);
    Vue.component("new-date-time", DateTime);
    Vue.component("new-progress", Progress);
    Vue.component("new-table", Table);
    Vue.component("new-page", Page);
    Vue.component("new-search", Search);
    Vue.component("new-dropdown", DropDown);
    Vue.component("new-left-menu", LeftMenu);
    Vue.component("advanced-search-container", AdvancedSearchContainer);
    Vue.component("new-drawer", Drawer);
    Vue.component("new-tooltip", Tooltip);
    Vue.component("new-chart", Chart);
    Vue.component("new-card", Card);
    Vue.component("input-element", AppInputElement);
    Vue.component("new-animated-number", AnimatedNumber);
  }
});
