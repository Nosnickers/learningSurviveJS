import component from "./component";
import imgCpt from './img-cmpt'
import "./main.css";

// import "react";
// import "react-dom";

import { bake } from "./shake";

bake();

document.body.appendChild(component('2222'));
document.body.appendChild(imgCpt());