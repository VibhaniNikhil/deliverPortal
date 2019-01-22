import AuthActions from 'actions/Auth'
import lodashCloneDeep from 'lodash.clonedeep';

const DefaultState = {
    userId: null,
    principalId: null,
    userName: null,
    rememberUserName: false,
    token: null,
    refreshToken: null,
    isLoggedIn: null,
    pending: false,
    roles: {},
    ui: {

    }
};

const AuthReducer = (state = DefaultState, action) => {
    const payload = action.payload;
    
    switch (action.type) {
        case AuthActions.signIn.action:
            state = { ...state };
            state.pending = true;
            break;

        case AuthActions.signIn.actionSuccess:
            state = { ...state };
            state.userName = payload.userName;
            state.rememberUserName = payload.rememberUserName;
            state.pending = false;
            state.isLoggedIn = true;
            state.token = payload.token;
            state.userId = payload.token.getUserId();
            state.principalId = payload.token.getPrincipalId();
            state.roles = payload.token.getRoles();
            break;

        case AuthActions.signIn.actionFailed:
            state = { ...state };
            state.pending = false;
            break;

        case AuthActions.signOut.action:
            const { rememberUserName, userName } = state;
            state = { ...state };
            state.rememberUserName = rememberUserName;
            if (rememberUserName){
                state.userName = userName;
            }

            break;            
    }

    return state;
}

export default AuthReducer;