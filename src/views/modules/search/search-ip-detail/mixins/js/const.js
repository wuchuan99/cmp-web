/**
 * 获取漏洞颜色
 * @param {*} level
 * @returns
 */
export const getVulLevelColor = level => {
  const levelObj = {
    低危: "#008dff",
    中危: "#ffc100",
    高危: "#ff7f00",
    超危: "#ff4c4c"
  };
  return levelObj[level] || "#008dff";
};
