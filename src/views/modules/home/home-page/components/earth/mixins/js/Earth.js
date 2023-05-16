import {
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector3,
  AdditiveBlending
} from "three";
import html2canvas from "html2canvas";
import { createLightPillar, createWaveMesh, lon2xyz } from "../../utils/common";
import { flyArc } from "../../utils/arc";
import gsap from "gsap";

export default class earth {
  group;
  earthGroup;
  around;
  aroundPoints;
  options;
  uniforms;
  earth;
  punctuationMaterial;
  markupPoint;
  flyLineArcGroup;

  constructor(options) {
    this.options = options;

    this.group = new Group();
    this.group.name = "group";
    console.log(this.group);
    this.earthGroup = new Group();
    this.earthGroup.scale.set(0, 0, 0);
    this.group.add(this.earthGroup);
    this.earthGroup.name = "EarthGroup";

    // 标注点效果
    this.markupPoint = new Group();
    this.markupPoint.name = "markupPoint";
  }

  async init() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      this.createStars(); // 添加星星
      this.createEarth(); // 创建地球
      this.createEarthGlow(); // 创建地球辉光
      await this.createMarkupPoint(); // 创建柱状点位
      await this.createSpriteLabel(); // 创建标签
      // this.createFlyLine(); // 创建飞线

      this.show();
      resolve();
    });
  }

  createEarth() {
    // 创建地球
    let earthGeometry = new SphereGeometry(this.options.earth.radius, 32, 32);
    let earthMaterial = new MeshBasicMaterial({
      map: this.options.textures.map,
      transparent: true
    });
    this.earth = new Mesh(earthGeometry, earthMaterial);
    this.earth.name = "earth";
    this.earthGroup.add(this.earth);
    // 创建发光的地球
    const lightEarthGeometry = new SphereGeometry(
      this.options.earth.radius + 3,
      32,
      32
    );

    let lightEarthMaterial = new MeshBasicMaterial({
      map: this.options.textures.earth,
      alphaMap: this.options.textures.earth,
      blending: AdditiveBlending,
      transparent: true
    });
    let lightEarth = new Mesh(lightEarthGeometry, lightEarthMaterial);
    lightEarth.name = "lightEarth";
    this.earthGroup.add(lightEarth);
    console.log(this.earthGroup);
    this.earthGroup.rotation.set(Math.PI / 7, Math.PI, 0);
  }

  createStars() {
    const vertices = [];
    for (let i = 0; i < 500; i++) {
      const vertex = new Vector3();
      vertex.x = 800 * Math.random() - 400;
      vertex.y = 800 * Math.random() - 400;
      vertex.z = 800 * Math.random() - 400;
      vertices.push(vertex.x, vertex.y, vertex.z);
    }

    // 星空效果
    this.around = new BufferGeometry();
    this.around.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );

    const aroundMaterial = new PointsMaterial({
      size: 2,
      sizeAttenuation: true, // 尺寸衰减
      depthWrite: false,
      color: 0x4d76cf,
      transparent: true,
      opacity: 1,
      map: this.options.textures.gradient,
      blending: AdditiveBlending
    });
    console.log(aroundMaterial);

    this.aroundPoints = new Points(this.around, aroundMaterial);
    console.log(this.aroundPoints);
    this.aroundPoints.name = "stars";
    this.group.add(this.aroundPoints);
  }

  createEarthGlow() {
    //内发光
    let spriteMaterialInner = new SpriteMaterial({
      map: this.options.textures.innerGlow,
      color: 0x4d76cf,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending
    });
    let sprite1 = new Sprite(spriteMaterialInner);
    sprite1.name = "innerGlow";
    sprite1.scale.set(130, 130, 0);
    this.earthGroup.add(sprite1);
  }

  async createMarkupPoint() {
    const createGroup = (lon, lat, obj) => {
      const WaveMesh = createWaveMesh({ textures: this.options.textures }); //波动光圈
      WaveMesh.userData = obj;
      // 波动动画
      gsap.to(WaveMesh.scale, {
        duration: 1 + Math.random() * 0.5,
        x: 2,
        y: 2,
        z: 2,
        repeat: -1,
        delay: Math.random() * 0.5,
        yoyo: true,
        ease: "power2.inOut"
      });

      const LightPillar = createLightPillar({
        lon,
        lat,
        textures: this.options.textures,
        punctuation: this.options.punctuation
      }); //光柱
      LightPillar.userData = obj;
      for (const it of LightPillar.children) {
        if (it.name === "lightPillarClone") {
          it.userData = obj;
        }
      }
      LightPillar.scale.set(0.8, 0.8, 0.8);
      LightPillar.add(WaveMesh);
      this.markupPoint.add(LightPillar);
      console.log(LightPillar);
    };
    await Promise.all(
      this.options.data.map(async item => {
        const lon = item.E; //经度
        const lat = item.N; //纬度
        createGroup(lon, lat, item);
        // const lon = item.startArray.E; //经度
        // const lat = item.startArray.N; //纬度
        // createGroup(lon, lat, item.startArray);

        // await Promise.all(
        //   item.endArray.map(obj => {
        //     const lon = obj.E; //经度
        //     const lat = obj.N; //纬度
        //     createGroup(lon, lat, obj);
        //   })
        // );
        this.earthGroup.add(this.markupPoint);
      })
    );
  }

  async createSpriteLabel() {
    // await Promise.all(
    //   this.options.data.map(async item => {
    //     let cityArry = [];
    //     cityArry.push(item);
    // cityArry = cityArry.concat(...item.endArray);
    this.options.data.reducer((pre, e) => {
      return pre.then(async () => {
        const p = lon2xyz(this.options.earth.radius, e.E, e.N);
        const div = `<div class="fire-div">${e.name}</div>`;
        const shareContent = document.getElementById("html2canvas");
        shareContent.innerHTML = div;
        const opts = {
          backgroundColor: null, // 背景透明
          scale: 6,
          dpi: window.devicePixelRatio
        };
        const canvas = await html2canvas(
          document.getElementById("html2canvas"),
          opts
        );
        const dataURL = canvas.toDataURL("image/png");
        const map = new TextureLoader().load(dataURL);
        const material = new SpriteMaterial({
          map: map,
          transparent: true
        });
        const sprite = new Sprite(material);
        sprite.name = "label";
        sprite.userData = e;
        const len = 5 + (e.name.length - 2) * 2;
        sprite.scale.set(len, 3, 1);
        sprite.position.set(p.x * 1.1, p.y * 1.1, p.z * 1.1);
        sprite.quaternion.setFromUnitVectors(
          new Vector3(0, 1, 0),
          sprite.position.clone().normalize()
        );
        this.earth.add(sprite);
      });
    }, Promise.resolve());
    await Promise.all(
      this.options.data.map(async e => {
        const p = lon2xyz(this.options.earth.radius, e.E, e.N);
        const div = `<div class="fire-div">${e.name}</div>`;
        const shareContent = document.getElementById("html2canvas");
        shareContent.innerHTML = div;
        const opts = {
          backgroundColor: null, // 背景透明
          scale: 6,
          dpi: window.devicePixelRatio
        };
        const canvas = await html2canvas(
          document.getElementById("html2canvas"),
          opts
        );
        const dataURL = canvas.toDataURL("image/png");
        const map = new TextureLoader().load(dataURL);
        const material = new SpriteMaterial({
          map: map,
          transparent: true
        });
        const sprite = new Sprite(material);
        sprite.name = "label";
        sprite.userData = e;
        const len = 5 + (e.name.length - 2) * 2;
        sprite.scale.set(len, 3, 1);
        sprite.position.set(p.x * 1.1, p.y * 1.1, p.z * 1.1);
        sprite.quaternion.setFromUnitVectors(
          new Vector3(0, 1, 0),
          sprite.position.clone().normalize()
        );
        this.earth.add(sprite);
      })
    );
    // })
    // );
  }

  createFlyLine() {
    this.flyLineArcGroup = new Group();
    this.flyLineArcGroup.userData["flyLineArray"] = [];
    this.earthGroup.add(this.flyLineArcGroup);

    this.options.data.forEach(cities => {
      cities.endArray.forEach(item => {
        // 调用函数flyArc绘制球面上任意两点之间飞线圆弧轨迹
        const arcline = flyArc(
          this.options.earth.radius + 3,
          cities.startArray.E,
          cities.startArray.N,
          item.E,
          item.N,
          this.options.flyLine
        );

        this.flyLineArcGroup.add(arcline); // 飞线插入flyArcGroup中
        // 飞线动画
        const flyLine = arcline.userData["flyLine"];
        gsap.to(flyLine.rotation, {
          z: flyLine.flyEndAngle,
          duration: 4,
          repeat: -1
        });
      });
    });
  }

  show() {
    gsap.to(this.earthGroup.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 2,
      ease: "Quadratic"
    });
  }
}
