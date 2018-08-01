// Motorcycle model codes can be seen in /backend/priv/repo/seeds.exs
import hunkImgUrl from '../images/Hunk.png';
import ignitorImgUrl from '../images/ignitor.png';
import hunkSportImgUrl from '../images/Hunk-sport.png';
import dashImgUrl from '../images/dash.png';


const availableColors = {
  HUNK: [
    {
      name: 'Rojo',
      imageURL: 'https://dummyimage.com/50/ff0000/ff0000',
      bikeImageURL: hunkImgUrl,
    },
    {
      name: 'Negro Panther',
      imageURL: 'https://dummyimage.com/50/000000/000000',
      bikeImageURL: 'https://dummyimage.com/50/000000/000000',
    },
    {
      name: 'Negro Mate',
      imageURL: 'https://dummyimage.com/50/555555/555555',
      bikeImageURL: 'https://dummyimage.com/50/555555/555555',
    },
    {
      name: 'Blanco',
      imageURL: 'https://dummyimage.com/50/ffffff/ffffff',
      bikeImageURL: 'https://dummyimage.com/50/ffffff/ffffff',
    },
  ],
  HUNK_SPORT: [
    {
      name: 'Rojo Fiery',
      imageURL: 'https://dummyimage.com/50/ff0000/ff0000',
      bikeImageURL: hunkSportImgUrl,
    },
    {
      name: 'Negro Panther',
      imageURL: 'https://dummyimage.com/50/000000/000000',
      bikeImageURL: 'https://dummyimage.com/50/000000/000000',
    },
    {
      name: 'Gris Mercuric',
      imageURL: 'https://dummyimage.com/50/666666/666666',
      bikeImageURL: 'https://dummyimage.com/50/666666/666666',
    },
    {
      name: 'Blanco',
      imageURL: 'https://dummyimage.com/50/ffffff/ffffff',
      bikeImageURL: 'https://dummyimage.com/50/ffffff/ffffff',
    },
  ],
  IGNITOR: [
    {
      name: 'Azul',
      imageURL: 'https://dummyimage.com/50/0000ff/0000ff',
      bikeImageURL: ignitorImgUrl,
    },
    {
      name: 'Rojo',
      imageURL: 'https://dummyimage.com/50/ff0000/ff0000',
      bikeImageURL: 'https://dummyimage.com/50/ff0000/ff0000',
    },
    {
      name: 'Gris',
      imageURL: 'https://dummyimage.com/50/666666/666666',
      bikeImageURL: 'https://dummyimage.com/50/666666/666666',
    },
  ],
  DASH: [
    {
      name: 'Negro Panther',
      imageURL: 'https://dummyimage.com/50/000000/000000',
      bikeImageURL: dashImgUrl,
    },
    {
      name: 'Verde Oscuro',
      imageURL: 'https://dummyimage.com/50/257700/257700',
      bikeImageURL: 'https://dummyimage.com/50/257700/257700',
    },
    {
      name: 'Gris',
      imageURL: 'https://dummyimage.com/50/666666/666666',
      bikeImageURL: 'https://dummyimage.com/50/666666/666666',
    },
  ],
};

export default availableColors;
