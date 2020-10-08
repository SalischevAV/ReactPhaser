import axios from 'axios';
import SERVER from '../../redux/SERVER';
import { getCookie } from '../../utils/getCookie';
export default class Raiting extends Phaser.Scene {

  constructor() {
    super({ key: 'Raiting' });
  }

  init(props) {
    const scene = props;
    this.returnScene = scene;

    this.x = this.cameras.main.width / 2;
    this.y = this.cameras.main.height / 2;
    this.getRaiting(); 
  }

  getRaiting() {
    axios
      .get(`${SERVER}scores`, {
        headers: { Authorization: `Bearer ${getCookie('token')}`}
      })
      .then(res => {
        const scores = res.data;
        console.log(scores);
        for(let i =0; i <scores.length; i++){
           this.add.text(10 , (this.y-300) + i*50 , `${i+1}. max scores:${scores[i].highScore}, name:${scores[i].name}`,  {fontSize: '50px', fontWeight: 'bold', fill: '#fff'});
        }       
      })
      .catch(err => {
        console.log(err);
      })
  }

  create() {
    const returnButton = this.add.text(this.x, this.y + 299, `Return`)
      .setOrigin(0.5, 0);

    returnButton.setInteractive()
      .once('pointerup', () => {
        this.scene.sleep('Raiting');
        this.scene.start(this.returnScene.scene);
      });  
    }
}