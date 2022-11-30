import {constants} from './constants';

export const setFavorite = data => ({
  type: constants.SET_FAVORITE,
  payload: data,
});

export const deleteFavorite = data => ({
  type: constants.DELETE_FAVORITE,
  payload: data.id,
});
