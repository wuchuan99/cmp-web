<!-- 初始oauth2跳转页面 -->
<script>
import { oauth2Url } from "@/api/login/login";
export default {
  created() {
    window.location.href = oauth2Url;
  }
};
</script>
