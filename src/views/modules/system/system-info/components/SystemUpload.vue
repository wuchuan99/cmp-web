<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      accept=".lic"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
    >
      <span class="primary">授权</span>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    beforeUpload(file) {
      console.log(file);
      const { name } = file;
      const isLicense = name.endsWith(".lic");
      if (!isLicense) {
        this.$message.error("只能上传License的文件");
      }
      return isLicense;
    },
    onSuccess(response) {
      this.$emit("success", response);
    },
    onError(err) {
      this.$emit("error", err);
    }
  }
};
</script>
<style lang="scss" scoped>
.upload {
  display: inline-block;
  .primary {
    color: #135bd2;
  }
}
</style>
