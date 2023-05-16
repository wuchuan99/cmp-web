import {
  getstatsIpTop,
  getstatsPortTop,
  getstatsServiceTop,
  getstatsVulTypeTop,
  getstatsDeviceTypeTop,
  getstatsVendorTop,
  getstatsAppTop,
  getstatsOsTop,
  getstatsVulLevelTop,
  getstatsVulDeviceTop,
  getstatsVulVendorTop,
  getstatsDevicePrimaryTop
} from "@/api/statistics/statistics-list";
export const chartMap = new Map([
  [
    "ipRef",
    {
      seriesType: "bar",
      method: getstatsIpTop,
      option: "ipOption"
    }
  ],
  [
    "portRef",
    {
      seriesType: "bar",
      method: getstatsPortTop,
      option: "portOption"
    }
  ],
  [
    "serviceRef",
    {
      seriesType: "bar",
      method: getstatsServiceTop,
      option: "serviceOption"
    }
  ],
  [
    "vulRef",
    {
      seriesType: "bar",
      method: getstatsVulTypeTop,
      option: "vulOption"
    }
  ],
  [
    "deviceTypeRef",
    {
      seriesType: "pie",
      method: getstatsDeviceTypeTop,
      option: "deviceTypeOption"
    }
  ],
  [
    "deviceVendorRef",
    {
      seriesType: "pie",
      method: getstatsVendorTop,
      option: "deviceVendorOption"
    }
  ],
  [
    "systemComponentRef",
    {
      seriesType: "pie",
      method: getstatsAppTop,
      option: "systemComponentOption"
    }
  ],
  [
    "osRef",
    {
      seriesType: "pie",
      method: getstatsOsTop,
      option: "osOption"
    }
  ],
  [
    "vulLevelRef",
    {
      seriesType: "pie",
      method: getstatsVulLevelTop,
      option: "vulLevelOption"
    }
  ],
  [
    "vulnerableDeviceRef",
    {
      seriesType: "pie",
      method: getstatsVulDeviceTop,
      option: "vulnerableDeviceOption"
    }
  ],
  [
    "vulnerableDeviceVendorRef",
    {
      seriesType: "pie",
      method: getstatsVulVendorTop,
      option: "vulnerableDeviceVendorOption"
    }
  ],
  [
    "highRiskAssetRef",
    {
      seriesType: "pie",
      method: getstatsDevicePrimaryTop,
      option: "highRiskAssetOption"
    }
  ]
]);
