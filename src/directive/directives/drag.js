/**
 * 元素拖拽（当前元素position：fixed or absolute）
 */
const drag = {
  // inserted(el, binding, vnode) {
  inserted(el) {
    el.style.cursor = "move";
    el.onmousedown = e => {
      //算出鼠标相对元素的位置
      let disx = e.pageX - el.offsetLeft;
      let disy = e.pageY - el.offsetTop;
      document.onmousemove = e => {
        let x = e.pageX - disx;
        let y = e.pageY - disy;
        let maxX =
          document.body.clientWidth -
          parseInt(window.getComputedStyle(el).width);
        let maxY =
          document.body.clientHeight -
          parseInt(window.getComputedStyle(el).height);
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }
        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }

        el.style.left = x + "px";
        el.style.top = y + "px";
      };
      document.onmouseup = () => {
        //鼠标弹起来的时候不再移动
        document.onmousemove = null;
        //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
        document.onmouseup = null;
      };
    };
  }
};

export default drag;
