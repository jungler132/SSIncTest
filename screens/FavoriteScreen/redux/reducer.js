import {constants} from './constants';

const initialState = {
  city: [],
};

export const reducerFavorite = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_FAVORITE:
      return {
        ...state,
        city: [...state.city, action.payload],
      };
    default:
      return state;
  }
};
