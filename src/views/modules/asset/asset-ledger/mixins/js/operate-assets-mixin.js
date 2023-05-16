import {
  getDeviceTypes,
  getDeviceVendors,
  getDeviceModels
} from "@/api/asset/asset-ledger";
export const operateAssetsMixins = {
  data() {
    return {
      deviceTypeOptions: [],
      vendorOptions: [],
      modelOptions: []
    };
  },
  methods: {
    initData() {
      this.getTypes();
      this.getVendors();
    },
    getTypes() {
      getDeviceTypes().then(res => {
        const { success, data } = res.data;
        if (success) {
          this.changData(data);
          this.deviceTypeOptions = data;
        }
      });
    },
    changData(data) {
      for (const item of data) {
        item.label = item.name;
        item.value = item.id;
        item.options = item.children;
        if (item.children) {
          this.changData(item.children);
        }
      }
    },
    getVendors() {
      getDeviceVendors().then(res => {
        const { success, data } = res.data;
        if (success)
          this.vendorOptions = data.map(item => ({
            label: item.vendorId,
            value: item.name
          }));
      });
    },
    getModels() {
      if (!this.form.deviceTypeId || !this.form.vendorId)
        return (this.modelOptions = []);
      getDeviceModels(this.form.vendorId, this.form.deviceTypeId).then(res => {
        const { success, data } = res.data;
        if (success)
          this.modelOptions = data.map(item => ({
            label: item.id,
            value: item.model
          }));
      });
    }
  }
};
