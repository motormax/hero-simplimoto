// Motorcycle model codes can be seen in /backend/priv/repo/seeds.exs
import glovesImgUrl from '../images/Guantes.png';
import helmetImgUrl from '../images/Casco.png';
import trunkImgUrl from '../images/Baul.png';


const availableAccessories = {
  gloves: {
    price: 800,
    imgUrl: glovesImgUrl,
  },
  helmet: {
    price: 1000,
    imgUrl: helmetImgUrl,
  },
  trunk: {
    price: 1500,
    imgUrl: trunkImgUrl,
  },
};

export default availableAccessories;
