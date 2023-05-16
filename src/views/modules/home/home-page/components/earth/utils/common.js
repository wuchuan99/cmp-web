import {
  CatmullRomCurve3,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TubeGeometry,
  Vector3,
  AdditiveBlending,
  Spherical
} from "three";

/**
 * 经纬度坐标转球面坐标
 * @param {地球半径} R
 * @param {经度(角度值)} longitude
 * @param {维度(角度值)} latitude
 */
export const lon2xyz = (R, longitude, latitude) => {
  let lon = (longitude * Math.PI) / 180; // 转弧度值
  const lat = (latitude * Math.PI) / 180; // 转弧度值
  lon = -lon; // js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return new Vector3(x, y, z);
};

export const lglt2xyz = (longitude, latitude) => {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (90 + longitude) * (Math.PI / 180);
  return new Vector3().setFromSpherical(Spherical(phi, theta));
};

// 创建波动光圈
export const createWaveMesh = options => {
  let circlePlane = new PlaneGeometry(6, 6);
  let circleMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    map: options.textures.label,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide
  });
  let circleMesh = new Mesh(circlePlane, circleMaterial);
  circleMesh.name = "WaveMesh";
  circleMesh.rotation.x = -Math.PI / 2;
  circleMesh.position.set(0, -7, 0);
  return circleMesh;
};

// 创建柱状
export const createLightPillar = options => {
  let lightPillarGeometry = new PlaneGeometry(3, 20);
  let lightPillarMaterial = new MeshBasicMaterial({
    color: options.punctuation.circleColor,
    map: options.textures.light_column,
    alphaMap: options.textures.light_column,
    transparent: true,
    blending: AdditiveBlending,
    side: DoubleSide,
    depthWrite: false
  });
  let lightPillar = new Mesh(lightPillarGeometry, lightPillarMaterial);
  let lightPillarClone = lightPillar.clone();
  lightPillarClone.name = "lightPillarClone";
  lightPillar.add(lightPillarClone.rotateY(Math.PI / 2));
  let position = lon2xyz(60, options.lon, options.lat);
  lightPillar.position.set(position.x, position.y, position.z);

  lightPillar.quaternion.setFromUnitVectors(
    new Vector3(0, 1, 0),
    position.clone().normalize()
  );
  lightPillar.name = "lightPillar";
  return lightPillar;
};

// 光柱底座矩形平面
export const createPointMesh = options => {
  const geometry = new PlaneGeometry(6, 6); //默认在XOY平面上
  const mesh = new Mesh(geometry, options.material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(0, -7, 0);
  return mesh;
};

// 获取点
export const getCirclePoints = option => {
  const list = [];
  for (
    let j = 0;
    j < 2 * Math.PI - 0.1;
    j += (2 * Math.PI) / (option.number || 100)
  ) {
    list.push([
      parseFloat((Math.cos(j) * (option.radius || 10)).toFixed(2)),
      0,
      parseFloat((Math.sin(j) * (option.radius || 10)).toFixed(2))
    ]);
  }
  if (option.closed) list.push(list[0]);
  return list;
};

// 创建线

/**
 * 创建动态的线
 */
export const createAnimateLine = option => {
  // 由多个点数组构成的曲线 通常用于道路
  const l = [];
  option.pointList.forEach(e => l.push(new Vector3(e[0], e[1], e[2])));
  const curve = new CatmullRomCurve3(l); // 曲线路径

  // 管道体
  const tubeGeometry = new TubeGeometry(
    curve,
    option.number || 50,
    option.radius || 1,
    option.radialSegments
  );
  return new Mesh(tubeGeometry, option.material);
};
