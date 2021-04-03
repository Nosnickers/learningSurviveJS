// import pSrc from "./smallShot.png";  // 动态方式使用css-loader

import W from './minify'

export default (pathSrc = './smallShot.png') => {
  // console.log(W)
  const element = document.createElement("img");
  // element.src = pSrc
  // 静态方式使用css-loader
  element.src = new URL('./smallShot.png', import.meta.url)
  // element.src = new URL(pathSrc, import.meta.url)
  return element;
};