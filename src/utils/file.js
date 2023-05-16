/**
 * 文件导出
 * @param response
 * @param type 导出文件类型
 */
export function fileExport(response, type) {
  // todo axios请求中需加入 responseType:blob
  const data = response;
  const name = data.headers["content-disposition"];
  const fileName =
    name && decodeURI(name.split("=")[name.split("=").length - 1]);
  //  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const typeList = {
    doc: "application/msword",
    docx:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xml: "application/xml",
    zip: "application/zip",
    all: "application/octet-stream"
  };

  const blob = new Blob([data.data], {
    type: typeList[type || "all"]
  });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    let URL = window.URL || window.webkitURL;
    let objectUrl = URL.createObjectURL(blob);
    if (fileName) {
      const a = document.createElement("a");
      if (typeof a.download === "undefined") {
        window.location = objectUrl;
      } else {
        a.href = objectUrl;
        a.download = fileName;
        a.click();
        a.remove();
      }
    } else {
      window.location = objectUrl;
    }
    URL.revokeObjectURL(objectUrl);
  }
}
