import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import DeliverStatApi from 'deliverStatApi/Index'
import AuthActions from 'actions/Auth'


function* signInUser(action){
    const {userName, password, rememberUserName} = action.payload; 
    try{
        const token  = yield call([DeliverStatApi.OAuthClient, DeliverStatApi.OAuthClient.getToken], userName, password);
        yield(put({
            type: AuthActions.signIn.actionSuccess,
            payload: { token, userName, rememberUserName }
        }));
        yield put(push('/'));
    }
    catch (err){
        yield(put({
            type: AuthActions.signIn.actionFailed,
            payload: err
        }));
    }
}

function* signOutUser(){
    yield put(replace('/signin'));
}

export function* onSignOutUser() {
    yield takeEvery(AuthActions.signOut.action, signOutUser);
}

export function* onSignInUser() {
     yield takeEvery(AuthActions.signIn.action, signInUser);
}

export default function* rootSaga() {
    yield all([fork(onSignInUser),
        fork(onSignOutUser)]);
}