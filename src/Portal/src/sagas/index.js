import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import userSagas from './User';

export default function* rootSaga(getState) {
    yield all([
        userSagas(),
        authSagas()
    ]);
}
