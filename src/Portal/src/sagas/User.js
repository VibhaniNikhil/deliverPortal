import {delay} from 'redux-saga'
import {all, call, fork, put, takeEvery, select } from 'redux-saga/effects';
import AuthActions from 'actions/Auth'
import UserActions from 'actions/User'
import DeliverStatApi from 'deliverStatApi/Index'

export const getAuthState = (state) => state.auth;
export const getUserState = (state) => state.user;

function*  refreshCurrentUserLoop(){
    const refreshInterval = AppSettings.UserRefreshInterval * 1000;

    while (true){
        const authState = yield select(getAuthState);
        if (!authState.isLoggedIn){
            break;
        }

        yield put(UserActions.refreshCurrentUser());
        yield call(delay, refreshInterval);
    }
}

function* refreshCurrentUser(){
    const userState = yield select(getUserState);
    let user = null;

    try{
        user = yield call([DeliverStatApi.User, DeliverStatApi.User.getCurrentUser]);
        yield put({
            type: UserActions.refreshCurrentUser.actionSuccess,
            payload: user
        })    
    }
    catch(err){
        if (err.statusCode === 304){
            return;
        }

        yield put({
            type: UserActions.refreshCurrentUser.actionFailed,
            payload: err
        })    
    }
}

function* onRefreshCurrentUser(){
    yield takeEvery(UserActions.refreshCurrentUser.action, refreshCurrentUser);
}

function* onUserSignIn(){
    yield takeEvery(AuthActions.signIn.actionSuccess, refreshCurrentUserLoop);
}

export default function* rootSaga() {
    yield all([fork(onUserSignIn),
        fork(onRefreshCurrentUser)]);
}