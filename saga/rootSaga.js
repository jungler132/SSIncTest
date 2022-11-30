import {spawn} from 'redux-saga/effects';

import {watcherFavorite} from '../screens/FavoriteScreen/saga';

export default function* rootSaga() {
  yield spawn(watcherFavorite);
}
