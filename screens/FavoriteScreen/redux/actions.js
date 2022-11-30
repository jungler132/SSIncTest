import {constants} from './constants';

export const setFavorite = data => ({
  type: constants.SET_FAVORITE,
  payload: data,
});
