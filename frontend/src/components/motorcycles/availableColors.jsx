// Motorcycle model codes can be seen in /backend/priv/repo/seeds.exs
import hunkBlackMateImgUrl from '../images/bikes/hunk-3-4-black.png';
import hunkBlackPantherImgUrl from '../images/bikes/hunk-3-4-black-2.png';
import hunkGrayImgUrl from '../images/bikes/hunk-3-4-gray.png';
import hunkRedImgUrl from '../images/bikes/hunk-3-4-red.png';

import hunkSportBlackImgUrl from '../images/bikes/hunk-sport-3-4-black.png';
import hunkSportGrayImgUrl from '../images/bikes/hunk-sport-3-4-gray.png';
import hunkSportRedImgUrl from '../images/bikes/hunk-sport-3-4-red.png';
import hunkSportWhiteImgUrl from '../images/bikes/hunk-sport-3-4-white.png';

import ignitorBlueImgUrl from '../images/bikes/ignitor-3-4-blue.png';
import ignitorGrayImgUrl from '../images/bikes/ignitor-3-4-gray.png';
import ignitorRedImgUrl from '../images/bikes/ignitor-3-4-red.png';

import dashBlackImgUrl from '../images/bikes/dash-3-4-black.png';
import dashGrayImgUrl from '../images/bikes/dash-3-4-gray.png';
import dashGreenImgUrl from '../images/bikes/dash-3-4-green.png';


const availableColors = {
  HUNK: [
    {
      name: 'Rojo Candy Blazing',
      imageURL: 'https://dummyimage.com/50/ff0000/ff0000',
      bikeImageURL: hunkRedImgUrl,
    },
    {
      name: 'Negro Panther',
      imageURL: 'https://dummyimage.com/50/000000/000000',
      bikeImageURL: hunkBlackPantherImgUrl,
    },
    {
      name: 'Negro Mate',
      imageURL: 'https://dummyimage.com/50/555555/555555',
      bikeImageURL: hunkBlackMateImgUrl,
    },
    {
      name: 'Blanco',
      imageURL: 'https://dummyimage.com/50/ffffff/ffffff',
      bikeImageURL: hunkGrayImgUrl,
    },
  ],
  HUNK_SPORT: [
    {
      name: 'Rojo Sport',
      imageURL: 'https://dummyimage.com/50/ff0000/ff0000',
      bikeImageURL: hunkSportRedImgUrl,
    },
    {
      name: 'Negro Panther',
      imageURL: 'https://dummyimage.com/50/000000/000000',
      bikeImageURL: hunkSportBlackImgUrl,
    },
    {
      name: 'Gris Mercuric',
      imageURL: 'https://dummyimage.com/50/666666/666666',
      bikeImageURL: hunkSportGrayImgUrl,
    },
    {
      name: 'Blanco',
      imageURL: 'https://dummyimage.com/50/ffffff/ffffff',
      bikeImageURL: hunkSportWhiteImgUrl,
    },
  ],
  IGNITOR: [
    {
      name: 'Azul',
      imageURL: 'https://dummyimage.com/50/0000ff/0000ff',
      bikeImageURL: ignitorBlueImgUrl,
    },
    {
      name: 'Rojo',
      imageURL: 'https://dummyimage.com/50/ff0000/ff0000',
      bikeImageURL: ignitorRedImgUrl,
    },
    {
      name: 'Gris',
      imageURL: 'https://dummyimage.com/50/666666/666666',
      bikeImageURL: ignitorGrayImgUrl,
    },
  ],
  DASH: [
    {
      name: 'Negro Panther',
      imageURL: 'https://dummyimage.com/50/000000/000000',
      bikeImageURL: dashBlackImgUrl,
    },
    {
      name: 'Verde Oscuro',
      imageURL: 'https://dummyimage.com/50/257700/257700',
      bikeImageURL: dashGreenImgUrl,
    },
    {
      name: 'Gris',
      imageURL: 'https://dummyimage.com/50/666666/666666',
      bikeImageURL: dashGrayImgUrl,
    },
  ],
};

export default availableColors;
