import hunkImgUrl from '../images/Hunk.png';
import ignitorImgUrl from '../images/ignitor.png';
import hunkSportImgUrl from '../images/Hunk-sport.png';
import dashImgUrl from '../images/dash.png';

const availableMotorcycles = {
  /*
  Until we implement dynamic motorcycle selection, we use hardcoded IDs.
  Motorcycle IDs can be found in backend/priv/repo/seeds.exs (they are 1-indexed).
  */
  HUNK: {
    id: 1,
    displayName: 'Hunk',
    defaultImageUrl: hunkImgUrl,
  },
  IGNITOR: {
    id: 2,
    displayName: 'Ignitor',
    defaultImageUrl: ignitorImgUrl,
  },
  HUNK_SPORT: {
    id: 3,
    displayName: 'Hunk Sport',
    defaultImageUrl: hunkSportImgUrl,
  },
  DASH: {
    id: 4,
    displayName: 'Dash',
    defaultImageUrl: dashImgUrl,
  },
};

export default availableMotorcycles;
