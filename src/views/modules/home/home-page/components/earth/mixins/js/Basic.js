/**
 * 创建 threejs 四大天王
 * 场景、相机、渲染器、控制器
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Basic {
  scene;
  camera;
  renderer;
  controls;
  dom;
  raycaster;

  constructor(dom) {
    this.dom = dom;
    this.initScenes();
    this.setControls();
  }

  /**
   * 初始化场景
   */
  initScenes() {
    this.raycaster = new THREE.Raycaster();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.dom.offsetWidth / this.dom.offsetHeight,
      1,
      100000
    );
    this.camera.position.set(0, 0, 300);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // 透明
      antialias: true // 抗锯齿
    });
    this.renderer.setPixelRatio(window.devicePixelRatio); // 设置屏幕像素比
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight); // 设置渲染器宽高
    this.dom.appendChild(this.renderer.domElement); // 添加到dom中
  }

  /**
   * 设置控制器
   */
  setControls() {
    // 鼠标控制      相机，渲染dom
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 自动围绕目标旋转
    this.controls.autoRotate = true;

    // 旋转的速度
    this.controls.autoRotateSpeed = 1.0;

    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = true;
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
    this.controls.dampingFactor = 0.05;
    // 是否可以缩放
    this.controls.enableZoom = false;
    // 设置相机距离原点的最近距离
    this.controls.minDistance = 1;
    // 设置相机距离原点的最远距离
    this.controls.maxDistance = 100000;
    // 是否开启右键拖拽
    this.controls.enablePan = false;

    // this.controls.addEventListener("change", () => {
    //   console.log(this.controls.getDistance());
    // });
  }

  pick(normalizedPosition) {
    this.raycaster.setFromCamera(normalizedPosition, this.camera);
    const intersectedObjects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    if (intersectedObjects.length) {
      return intersectedObjects[0].object;
    }
    return null;
  }
}
