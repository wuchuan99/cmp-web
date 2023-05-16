import { debounce } from "@/utils/common";
export default {
  methods: {
    handle: debounce(function({ action, value }) {
      this[action] && this[action](value);
    }, 200)
  }
};
