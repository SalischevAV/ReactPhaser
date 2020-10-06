import axios from 'axios';
import SERVER from '../../redux/SERVER';
import { getCookie} from '../../utils/getCookie';
export default class Raiting extends Phaser.Scene {
   
    constructor() {
      super({key: 'Raiting'});
      this.scores;
    }
    
    init(props){
        const scene  = props; 
        this.returnScene = scene;  
        this.getRaiting(); 
        console.log(this.scores); 
        // for(let i =0; i <this.scores.length; i++){
        //   this.add.text(x , (y-200) + i*30 , `${this.scores[i]}`,  {fontSize: '32px', fill: '#aaa'}) 
        // }
        
    }

    getRaiting() {    
          try {
              axios
                  .get(`${SERVER}scores`, {
                      headers: { Authorization: `Bearer ${getCookie('token')}` }
                  })
                  .then(res => {
                    console.log(res)
                    this.scores = res.data                  
                  }) 
  
          }
          catch (err) {
              console.log(err)
            
          }
      
  }

    create(/* data */) {
  
      const x = this.cameras.main.width / 2;
      const y = this.cameras.main.height / 2;
  

      // for(let i =0; i <this.scores.length; i++){
      //   this.add.text(x , (y-200) + i*30 , `${this.scores[i]}`,  {fontSize: '32px', fill: '#aaa'}) 
      // }
      
      
      const returnButton = this.add.text(x, y + 299, `Return`)
            .setOrigin(0.5, 0);

            returnButton.setInteractive()
            .once('pointerup', () => {
                this.scene.sleep('Raiting');
                this.scene.start(this.returnScene.scene);
            });
  }
}