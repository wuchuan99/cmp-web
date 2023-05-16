<template>
  <div class="flex-center">
    <!-- <new-button>下载模板</new-button> -->
    <new-button
      :disabled="downloadBtnType === 'loading'"
      :type="downloadBtnType"
      @click="handle({ action: 'downloadFile' })"
      >下载模板</new-button
    >
    <el-upload
      :action="ipAddressfileUploadUrl"
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
import { ipAddressfileUploadUrl } from "@/api/task/task-list";
import { mapState } from "vuex";
import { fileExport } from "@/utils/file";
import { downloadTemplate } from "@/api/task/task-list";
import handleMixins from "@/mixins/handle";

export default {
  data() {
    return {
      downloadBtnType: "export",
      ipAddressfileUploadUrl,
      fileList: []
    };
  },
  computed: {
    ...mapState("login", {
      uploadHeader: state => state.uploadHeader
    })
  },
  mixins: [handleMixins],
  methods: {
    handleRemove() {
      this.$emit("updateTaskAddressCommand", {
        objectName: ""
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
        this.$emit("updateTaskAddressCommand", res.data);
      } else {
        this.$emit("uploadFileError", res.message);
        this.fileList = [];
      }
    },
    // 下载模板
    downloadFile() {
      this.downloadBtnType = "loading";
      downloadTemplate()
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
  :deep(.el-upload-list) {
    width: 242px;
    .el-upload-list__item {
      &:first-child {
        margin-top: 5px;
      }
      .el-upload-list__item-name {
        margin-right: 24px;
      }
    }
  }
}
</style>
