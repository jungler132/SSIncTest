import {takeEvery, put, call} from 'redux-saga/effects';
import {doRequest} from '../../../services/api/doRequest';
import {setFavorite} from '../redux/actions';
import {constants} from './action';

function* workerFavorite({arg}) {
  console.log('arg ----->', arg);
  // const city = yield call(() => doRequest(arg.arg));
  yield put(setFavorite(arg));
}

export function* watcherFavorite() {
  yield takeEvery(constants.FAVORITE_SCREEN_WATCHER, workerFavorite);
}
