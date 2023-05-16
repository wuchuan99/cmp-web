export const mapInit = ({ id, longitude, latitude }) => {
  const map = new window.BMapGL.Map(id),
    _longitude = longitude || 0,
    _latitude = latitude || 0;

  map.centerAndZoom(new window.BMapGL.Point(_longitude, _latitude), 12);

  // // 添加标记点
  const marker = new window.BMapGL.Marker(
    new window.BMapGL.Point(_longitude, _latitude)
  );
  map.addOverlay(marker);

  // 缩放
  map.enableScrollWheelZoom(true);

  return map;
};
