import { Basic } from "./Basic";
import Sizes from "../../utils/Sizes";
import { Resources } from "./Resources";

// earth
import Earth from "./Earth";
import { getRegionMap } from "@/api/home";
import { countryMap } from "../../utils/const";

export default class World {
  basic;
  scene;
  camera;
  renderer;
  controls;
  sizes;
  resources;
  option;
  earth;
  pickPosition = { x: -100000, y: -100000 };
  eventMap = new Map();
  animationId;
  maxClickTimeMs = 200;
  maxMoveDeltaSq = 5 * 5;
  startPosition = {};
  startTimeMs;

  constructor(option) {
    /**
     * 加载资源
     */
    this.option = option;

    this.basic = new Basic(option.dom);
    this.scene = this.basic.scene;
    this.renderer = this.basic.renderer;
    this.controls = this.basic.controls;
    this.camera = this.basic.camera;

    this.sizes = new Sizes({ dom: option.dom });

    this.sizes.$on("resize", () => {
      this.renderer.setSize(
        Number(this.sizes.viewport.width),
        Number(this.sizes.viewport.height)
      );
      this.camera.aspect =
        Number(this.sizes.viewport.width) / Number(this.sizes.viewport.height);
      this.camera.updateProjectionMatrix();
    });

    this.resources = new Resources(async () => {
      await this.createEarth();

      //初始化事件
      this.initEvent();

      // 开始渲染
      this.render();
    });
  }

  async createEarth() {
    const params = { topN: 10 };
    const res = await getRegionMap(params);
    const { success, data } = res?.data;
    if (!success || !data?.datas) return;
    // 资源加载完成，开始制作地球，注释在new Earth()类型里面
    this.earth = new Earth({
      data: data.datas.map(item => ({
        regionId: item.regionId,
        name: item.name,
        country: countryMap.get(item.regionId) || "",
        N: item.latitude,
        E: item.longitude
      })),
      dom: this.option.dom,
      textures: this.resources.textures,
      earth: {
        radius: 50,
        rotateSpeed: 0.002,
        isRotation: true
      },
      punctuation: {
        circleColor: 0xffffff,
        lightColumn: {
          startColor: 0xe4007f, // 起点颜色
          endColor: 0xffffff // 终点颜色
        }
      },
      flyLine: {
        color: 0xf3ae76, // 飞线的颜色
        flyLineColor: 0xff7714 // 飞行线的颜色
      }
    });
    this.scene.add(this.earth.group);

    await this.earth.init();

    // 隐藏dom
    const loading = document.querySelector("#loading");
    loading.classList.add("out");
    this.option.callBack && this.option.callBack();
  }

  initEvent() {
    const setPickPosition = this.setPickPosition.bind(this);
    this.addEvent("mousemove", setPickPosition);
    const clearPickPosition = this.clearPickPosition.bind(this);
    this.addEvent("mouseout", clearPickPosition);
    this.addEvent("mouseleave", clearPickPosition);
    const recordStartTimeAndPosition = this.recordStartTimeAndPosition.bind(
      this
    );
    this.addEvent("pointerdown", recordStartTimeAndPosition);
    const pickCity = this.pickCity.bind(this);
    this.addEvent("pointerup", pickCity);
  }

  addEvent(event, fn) {
    if (!this.eventMap.has(event)) {
      this.eventMap.set(event, fn);
      this.renderer.domElement.addEventListener(event, fn);
    }
  }

  clearEvent(event, fn) {
    if (this.eventMap.has(event)) {
      this.eventMap.delete(event);
      this.renderer.domElement.removeEventListener(event, fn);
    }
  }

  clearEventAll() {
    for (const [event, fn] of this.eventMap) {
      this.clearEvent(event, fn);
    }
    this.eventMap.clear();
    this.sizes.$off("resize");
  }

  pickCity(event) {
    // 如果用户触发后已经过了一段时间了
    // 就认为这是一个拖动行为
    const clickTimeMs = performance.now() - this.startTimeMs;
    if (clickTimeMs > this.maxClickTimeMs) {
      return;
    }

    // 如果鼠标移动了，就认为这是一个拖动行为
    const position = this.getCanvasRelativePosition(event);
    const moveDeltaSq =
      (this.startPosition.x - position.x) ** 2 +
      (this.startPosition.y - position.y) ** 2;
    if (moveDeltaSq > this.maxMoveDeltaSq) {
      return;
    }

    const object = this.basic && this.basic.pick(this.pickPosition);
    const whitelist = ["label", "WaveMesh", "lightPillarClone", "lightPillar"];
    if (whitelist.includes(object?.name)) {
      console.log(object);
      this.option.onCountryClick && this.option.onCountryClick(object.userData);
    }
  }

  recordStartTimeAndPosition(event) {
    this.startTimeMs = performance.now();
    const pos = this.getCanvasRelativePosition(event);
    this.startPosition.x = pos.x;
    this.startPosition.y = pos.y;
  }

  getCanvasRelativePosition(event) {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height
    };
  }

  setPickPosition(event) {
    const canvas = this.renderer.domElement;
    const pos = this.getCanvasRelativePosition(event);
    this.pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    this.pickPosition.y = (pos.y / canvas.height) * -2 + 1;

    // 添加鼠标小手样式
    const object = this.basic && this.basic.pick(this.pickPosition);
    const whitelist = ["label", "WaveMesh", "lightPillarClone", "lightPillar"];
    if (whitelist.includes(object?.name)) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
    // 移入地球停止旋转，移出地球开始旋转
    if (
      [
        "lightEarth",
        "label",
        "WaveMesh",
        "lightPillarClone",
        "lightPillar"
      ].includes(object?.name)
    ) {
      this.controls.autoRotate = false;
    } else {
      this.controls.autoRotate = true;
    }
  }

  clearPickPosition() {
    this.pickPosition.x = -100000;
    this.pickPosition.y = -100000;
    document.body.style.cursor = "default";
  }

  clearScene() {
    if (this.scene) {
      cancelAnimationFrame(this.animationId);
      this.render = null;
      this.scene.traverse(child => {
        if (child.material) {
          child.material.dispose();
        }
        if (child.geometry) {
          child.geometry.dispose();
        }
        child = null;
      });
      this.renderer.forceContextLoss();
      this.renderer.dispose();
      this.scene.clear();
      // 对象置空
      for (const key in this) {
        if (Object.hasOwnProperty.call(this, key)) {
          this[key] = null;
        }
      }
    }
  }

  /**
   * 渲染函数
   */
  render() {
    this.controls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.render.bind(this));
  }
}
