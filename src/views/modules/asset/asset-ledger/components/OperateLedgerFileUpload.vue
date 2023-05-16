<template>
  <div class="flex-center">
    <new-button
      :disabled="downloadBtnType === 'loading'"
      :type="downloadBtnType"
      @click="handle('downloadFile')"
      >下载模板</new-button
    >
    <el-upload
      :action="ipAddruploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :limit="1"
      :file-list="fileList"
      :headers="uploadHeader"
      :on-success="onsuccess"
      :on-error="onerror"
    >
      <new-button class="upload-button" type="import">上传模板</new-button>
    </el-upload>
  </div>
</template>
<script>
import { downloadTemplate, ipAddruploadUrl } from "@/api/asset/asset-ledger";
import { fileExport } from "@/utils/file";
import { debounce } from "@/utils/common";
import { mapState } from "vuex";
export default {
  data() {
    return {
      downloadBtnType: "export",
      ipAddruploadUrl,
      fileList: []
    };
  },
  props: {
    ledgerId: String
  },
  computed: {
    ...mapState("login", {
      uploadHeader: state => state.uploadHeader
    })
  },
  methods: {
    handle: debounce(function(action) {
      this[action] && this[action]();
    }, 200),
    handleRemove() {
      this.$emit("updateobjectName", {
        objectName: "",
        ipSegments: [""]
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    onerror(res) {
      console.log(res);
    },
    onsuccess(res) {
      if (res.success) {
        this.$emit("updateobjectName", res.data);
      } else {
        this.$emit("uploadFileError", res.message);
        this.fileList = [];
      }
    },
    // 下载模板
    downloadFile() {
      this.downloadBtnType = "loading";
      downloadTemplate(this.ledgerId)
        .then(res => {
          if (res.status === 200) fileExport(res);
          else this.$message.error("下载失败");
          this.downloadBtnType = "download";
        })
        .catch(() => (this.downloadBtnType = "download"));
    }
  }
};
</script>
<style lang="scss" scoped>
.flex-center {
  height: 36px;
  & > div {
    display: flex;
    align-items: center;
  }
  :deep(.el-upload) {
    height: 36px;
    margin-left: 10px;
  }
  :deep(.el-upload-list__item:first-child) {
    margin-top: 5px;
  }
}
</style>
