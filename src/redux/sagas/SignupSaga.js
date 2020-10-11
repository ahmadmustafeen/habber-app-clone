import {put, call} from 'redux-saga/effects';

export function* signupSaga() {
  try {
    // console.log('SIgnUp Saga . . . .  .');
    const data = yield call(() => fetch('https://reactnative.dev/movies.json'));
    console.log('SIgnUp Saga . . . .  .', data);
    yield put({type: 'FETCH_SUCCEEDED', paylaod: null});
  } catch (error) {
    yield put({type: 'FETCH_FAILED', error});
  }
}
