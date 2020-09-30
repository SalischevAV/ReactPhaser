

import * as scenes from './scenes';


export const width = 640;


export const height = 360;


export const zoom = 1;


export const resolution = 1;


export const type = Phaser.AUTO;


export const pixelArt = false;


export const transparent = false;


export const canvasStyle = 'display: block; margin: 0 auto;';


export const backgroundColor = '#bfcc00';


export const physics = {
 
  default: false
};


// export const loader = {
 
//   path: '../assets/img/'
// };


export const plugins = {
  global: [],

  scene: []
};

// export {title, version, url} from '@/../../package.json';


export const scene = Object.values(scenes);