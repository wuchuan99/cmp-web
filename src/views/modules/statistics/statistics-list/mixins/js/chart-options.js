import {
  barGrid,
  barSeries,
  barXAxis,
  barYAxis,
  title,
  tooltip,
  toolbox
} from "./const";
export const optionsMinxis = {
  data() {
    return {
      // IP分布
      ipOption: {
        tooltip,
        toolbox,
        title: {
          text: "IP分布TOP10",
          ...title
        },
        xAxis: {
          ...barXAxis,
          data: [
            "中国",
            "阿尔及利亚",
            "索马里",
            "列支敦士登",
            "摩洛哥",
            "西撒哈拉",
            "比利时",
            "贝宁",
            "巴西",
            "北马里亚纳群岛"
          ]
        },
        grid: {
          ...barGrid
        },
        yAxis: {
          ...barYAxis
        },
        series: [
          {
            type: "bar",
            ...barSeries,
            data: [2235, 1345, 567, 345, 134, 767, 2345, 1345, 567, 345]
          }
        ]
      },
      // 端口
      portOption: {
        tooltip,
        toolbox,
        title: {
          text: "端口TOP10",
          ...title
        },
        xAxis: {
          ...barXAxis,
          data: [8080, 80, 443, 22, 53, 25, 23, 30, 21, 100]
        },
        grid: {
          ...barGrid
        },
        yAxis: {
          ...barYAxis
        },
        series: [
          {
            type: "bar",
            ...barSeries,
            data: [567, 145, 57, 34, 13, 76, 235, 135, 57, 35]
          }
        ]
      },
      // 服务
      serviceOption: {
        tooltip,
        toolbox,
        title: {
          text: "服务TOP10",
          ...title
        },
        xAxis: {
          ...barXAxis,
          data: [
            "PLC",
            "Windows",
            "Linux",
            "ASP",
            "MySql",
            "Nginx",
            "摄像头",
            "Mincrosoft-Exchange",
            "IIS 11.0 SHS",
            "Video"
          ]
        },
        grid: {
          ...barGrid
        },
        yAxis: {
          ...barYAxis
        },
        series: [
          {
            type: "bar",
            ...barSeries,
            data: [517, 1245, 572, 341, 13, 476, 1325, 1354, 570, 305]
          }
        ]
      },
      // 漏洞类型
      vulOption: {
        tooltip,
        toolbox,
        title: {
          text: "漏洞类型TOP10",
          ...title
        },
        xAxis: {
          ...barXAxis,
          data: [
            "SQL注入",
            "XSS",
            "CSRF",
            "文件上传漏洞",
            "服务器请求伪造",
            "反序列化",
            "命令执行漏洞",
            "逻辑漏洞",
            "越权漏洞",
            "敏感信息泄露"
          ]
        },
        grid: {
          ...barGrid
        },
        yAxis: {
          ...barYAxis
        },
        series: [
          {
            type: "bar",
            ...barSeries,
            data: [57, 15, 57, 34, 13, 76, 35, 135, 57, 35]
          }
        ]
      },
      // 漏洞等级分布
      vulLevelOption: {
        title: {
          text: "漏洞等级分布",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "超危" },
              { value: 735, name: "高危" },
              { value: 580, name: "中危" },
              { value: 484, name: "低危" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 设备类型
      deviceTypeOption: {
        title: {
          text: "设备类型TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "PLC" },
              { value: 735, name: "SCADA" },
              { value: 580, name: "GATEWAY" },
              { value: 484, name: "EWS" },
              { value: 145, name: "DCS" },
              { value: 235, name: "DSC" },
              { value: 127, name: "OPC" },
              { value: 523, name: "HMI" },
              { value: 123, name: "CONVERTER" },
              { value: 58, name: "MMU" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 设备厂商
      deviceVendorOption: {
        title: {
          text: "设备厂商TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "西门子" },
              { value: 735, name: "施耐德" },
              { value: 580, name: "大华" },
              { value: 484, name: "威视达康" },
              { value: 145, name: "安科数字" },
              { value: 235, name: "索尼" },
              { value: 127, name: "宇视" },
              { value: 523, name: "MayGion" },
              { value: 123, name: "CONVERTER" },
              { value: 58, name: "天地伟业" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 系统组件
      systemComponentOption: {
        toolbox,
        title: {
          text: "系统组件TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "超危" },
              { value: 735, name: "高危" },
              { value: 580, name: "中危" },
              { value: 484, name: "低危" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 操作系统统计
      osOption: {
        title: {
          text: "操作系统统计TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 150, name: "DOS" },
              { value: 2636, name: "Windows" },
              { value: 580, name: "Linux" },
              { value: 102, name: "FreeBSD" },
              { value: 96, name: "NetWare" },
              { value: 360, name: "Unix" },
              { value: 1256, name: "Mac OS" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 存在漏洞的设备
      vulnerableDeviceOption: {
        title: {
          text: "存在漏洞的设备TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "PLC" },
              { value: 735, name: "SCADA" },
              { value: 580, name: "GATEWAY" },
              { value: 484, name: "EWS" },
              { value: 145, name: "DCS" },
              { value: 235, name: "DSC" },
              { value: 127, name: "OPC" },
              { value: 523, name: "HMI" },
              { value: 123, name: "CONVERTER" },
              { value: 58, name: "MMU" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 存在漏洞的设备厂商
      vulnerableDeviceVendorOption: {
        title: {
          text: "存在漏洞的设备厂商TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        grid: {
          ...barGrid
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "西门子" },
              { value: 735, name: "施耐德" },
              { value: 580, name: "大华" },
              { value: 484, name: "威视达康" },
              { value: 145, name: "安科数字" },
              { value: 235, name: "索尼" },
              { value: 127, name: "宇视" },
              { value: 523, name: "MayGion" },
              { value: 123, name: "CONVERTER" },
              { value: 58, name: "天地伟业" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 高危资产
      highRiskAssetOption: {
        title: {
          text: "资产领域TOP10",
          ...title
        },
        tooltip: {
          trigger: "item"
        },
        toolbox,
        grid: {
          ...barGrid
        },
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              formatter: "{b}: {@2012}"
            },
            data: [
              { value: 1048, name: "股票" },
              { value: 735, name: "债券" },
              { value: 580, name: "银行理财投资" },
              { value: 484, name: "P2P" },
              { value: 145, name: "房地产" },
              { value: 235, name: "贵金属" },
              { value: 127, name: "原油" },
              { value: 523, name: "有色系金属" },
              { value: 123, name: "黑色系金属" },
              { value: 58, name: "现金" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
};
