import {takeEvery, put} from 'redux-saga/effects';
import {deleteFavorite, setFavorite} from '../redux/actions';
import {constants} from './action';

function* workerFavorite({arg}) {
  yield put(setFavorite(arg));
}

function* workerDeleteFavorite({arg}) {
  console.log('arg ---->', arg);
  yield put(deleteFavorite(arg));
}

export function* watcherFavorite() {
  yield takeEvery(constants.FAVORITE_SCREEN_WATCHER, workerFavorite);
}

export function* watcherFavoriteDelete() {
  yield takeEvery(
    constants.FAVORITE_SCREEN_WATCHER_DELETE,
    workerDeleteFavorite,
  );
}
