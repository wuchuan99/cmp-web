/**
 * 资源文件
 * 把模型和图片分开进行加载
 */
const fileSuffix = [
  {
    name: "gradient",
    url: require("../images/gradient.png")
  },
  {
    name: "innerGlow",
    url: require("../images/innerGlow.png")
  },
  {
    name: "label",
    url: require("../images/label.png")
  },
  {
    name: "aperture",
    url: require("../images/aperture.png")
  },
  {
    name: "glow",
    url: require("../images/glow.png")
  },
  {
    name: "light_column",
    url: require("../images/light_column.png")
  },
  {
    name: "aircraft",
    url: require("../images/aircraft.png")
  },
  {
    name: "earth",
    url: require("../images/earth.jpg")
  },
  {
    name: "map",
    url: require("../images/map.jpg")
  }
];

const textures = fileSuffix.map(item => {
  return {
    name: item.name,
    url: item.url
  };
});

console.log(textures);

const resources = {
  textures
};

export { resources };
