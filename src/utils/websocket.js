/**
 * common websocket
 * @param url
 * @param getDataFn
 * @param openFn
 * @param sendData
 * @returns {WebSocket}
 */
export function initWebsocket(url, getDataFn, openFn, sendData) {
  // new websocket
  const websocket = new WebSocket(url);

  websocket.onmessage = e => {
    getDataFn
      ? getDataFn(e.data ? JSON.parse(e.data) : e)
      : console.log(e.data);
  };

  // connection
  websocket.onopen = () => {
    openFn ? openFn() : console.log(`${url} is opened`);
  };

  // error
  websocket.onerror = () => {
    // console.log(`error and restart`);
    // initWebsocket(url, getDataFn, openFn, sendData);
  };

  websocket.onclose = () => {
    console.log(`${url} is closed`);
    // websocket.websocketClose();
  };

  // send: onopen can be used
  websocket.websocketSend = data => {
    websocket.send(JSON.stringify(data || sendData));
  };

  // close and clear buffer
  websocket.websocketClose = () => {
    websocket.onerror = () => {};
    websocket.close();
    console.log(`websocket is closed`);
  };

  return websocket;
}
