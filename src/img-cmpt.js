// import pSrc from "./small-screenshot.png";  // 动态方式使用css-loader

import W from './minify'

export default (pathSrc = './small-screenshot.png') => {
  // console.log(W)
  const element = document.createElement("img");
  // element.src = pSrc
  // 静态方式使用css-loader
  element.src = new URL('./small-screenshot.png', import.meta.url)
  // element.src = new URL(pathSrc, import.meta.url)
  return element;
};