<template>
  <div class="search-list">
    <div
      v-for="(asset, index) in ipList"
      :key="asset.ip + index"
      class="asset-container"
    >
      <div class="asset-left">
        <div class="asset-ip">
          <div class="asset-ip-title" @click="goIpdetail(asset.ip)">
            {{ asset.ip }}
          </div>
          <!-- <img src="../mixins/images/copy.png" title="复制" /> -->
          <img
            src="../mixins/images/href.png"
            title="跳转"
            v-if="['https', 'http'].includes(asset?.scanPort?.service)"
            @click="
              jumpTo(
                `${asset.scanPort.service}://${asset.ip}:${asset.scanPort.port}`
              )
            "
          />
        </div>
        <div class="asset-info">
          <div class="asset-info-item">
            <img src="../mixins/images/location.png" alt="" />
            <span>位置：</span>
            <span>
              <new-tooltip
                :content="
                  `${asset.countryName}${
                    asset.regionName ? '-' + asset.regionName : ''
                  }`
                "
              ></new-tooltip>
            </span>
          </div>
          <div class="asset-info-item" v-show="asset.domainName">
            <img src="../mixins/images/website.png" alt="" />
            <span>网址：</span>
            <span>{{ asset.domainName }}</span>
          </div>
          <div class="asset-info-item" v-show="asset.scanPort.deviceType">
            <img src="../mixins/images/type.png" alt="" />
            <span>类型：</span>
            <span class="deviceType" :title="asset.scanPort.deviceType">{{
              asset.scanPort.deviceType
            }}</span>
            <el-tag
              class="tag"
              type="danger"
              v-show="asset.scanPort.deviceTag"
              >{{ asset.scanPort.deviceTag }}</el-tag
            >
          </div>
          <div class="asset-info-item" v-show="asset.scanPort.productName">
            <img src="../mixins/images/product.png" alt="" />
            <span>产品：</span>
            <span>{{ asset.scanPort.productName }}</span>
          </div>
          <div class="asset-info-item" v-show="asset.updateTime">
            <img src="../mixins/images/time.png" alt="" />
            <span>时间：</span>
            <span>{{ asset.updateTime }}</span>
          </div>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-port">
          <div class="asset-port-box asset-port-box-title">
            {{ asset["scanPort"]["port"] }}
          </div>
          <div class="asset-protocol-box asset-protocol-box-title">
            {{ asset["scanPort"]["service"] }}
          </div>
        </div>
        <div class="asset-html">
          <div class="banner-box" :class="{ onlySelf: !asset['certificate'] }">
            <new-button
              class="copy-btn"
              v-if="getHtml(asset.scanPort['banner'])"
              @click="copy(getHtml(asset.scanPort['banner']))"
              >复制</new-button
            >
            <div
              v-html="getHtml(asset.scanPort['banner'])"
              class="banner"
            ></div>
          </div>
          <div class="certificate-box" v-if="asset['certificate']">
            <new-button
              class="copy-btn"
              v-if="getHtml(asset['certificate'])"
              @click="copy(getHtml(asset['certificate']))"
              >复制</new-button
            >
            <div
              v-html="getHtml(asset['certificate'])"
              class="certificate"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <new-page
      v-show="total"
      :total.sync="total"
      :page.sync="pageIndex"
      :limit.sync="pageSize"
      @changeSize="handle({ action: 'changeSize', value: $event.limit })"
      @changePage="handle({ action: 'changePage', value: $event.page })"
    />
  </div>
</template>
<script>
import { getSearchIpList } from "@/api/search/search-list";
import { mapActions } from "vuex";
import { debounce, copy } from "@/utils/common";

export default {
  data() {
    return {
      ipList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      search: null,
      scrollTop: 0
    };
  },
  computed: {
    postObj() {
      return {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        search: this.search
      };
    },
    getHtml() {
      return val => {
        if (!val) return "";
        return val.replace(/(^"*)|("*$)/g, "").replace(/(^'*)|('*$)/g, "");
      };
    }
  },
  watch: {
    search: {
      handler() {
        this.changePage(1);
      }
    }
  },
  methods: {
    copy,
    ...mapActions("search", ["setSearchInfo"]),
    getSearchIps() {
      getSearchIpList(this.postObj).then(res => {
        const { data, success, totalCount, took } = res.data;
        if (success) {
          this.ipList = data;
          this.total = totalCount;
          // 记录时间 + 总数
          this.setSearchInfo({ took, totalCount });
        }
      });
    },
    handle: debounce(function({ action, value }) {
      this[action] && this[action](value);
    }, 200),
    // 分页
    changePage(page) {
      this.pageIndex = page;
      this.getSearchIps();
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.changePage(1);
    },
    goIpdetail(ip) {
      //记录滚动条位置
      const container = document.querySelector(".app-wrapper>.main");
      this.scrollTop = container.scrollTop;
      //跳转详情
      this.$router.push({
        name: "searchIpDetail",
        params: { ip: ip, search: this.search }
      });
    },
    jumpTo(url) {
      window.open(url, "_blank");
    },
    setSearch(search) {
      this.search = search;
    }
  },
  activated() {
    const container = document.querySelector(".app-wrapper>.main");
    container.scrollTop = this.scrollTop;
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/search-list.scss";
</style>
