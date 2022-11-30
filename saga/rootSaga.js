import {spawn} from 'redux-saga/effects';

import {
  watcherFavorite,
  watcherFavoriteDelete,
} from '../screens/FavoriteScreen/saga';

export default function* rootSaga() {
  yield spawn(watcherFavorite);
  yield spawn(watcherFavoriteDelete);
}
