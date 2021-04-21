import component from "./component";
import imgCpt from './img-cmpt'
import "./main.css";
// import "!demo-loader?name=fooDemo!./main.css";

import "react";
import "react-dom";

import { bake } from "./shake";

import componentWork from './component-work'

bake();

const c1 = component('2222')
document.body.appendChild(c1);
document.body.appendChild(imgCpt());
document.body.appendChild(componentWork(333))
