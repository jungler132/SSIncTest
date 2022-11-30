import {combineReducers} from 'redux';

import {reducerFavorite} from '../../screens/FavoriteScreen/redux/reducer';

export const rootReducer = combineReducers({
  reducerFavorite,
});
