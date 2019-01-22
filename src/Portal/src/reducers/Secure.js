import UserActions from '../../actions/UserActions';

const DefaultState = {
    identity: {
        userName: null,
        rememberUserName: false,
        token: null,
        refreshToken: null,
        isLoggedIn: null,
        roles: {}
    }
};

const SecurityReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case UserActions.Types.Login.success:
            state = { ...state };
            state.identity.isLoggedIn = true;
            break;

        case UserActions.Types.Logoff.success:
            state = { ...state };
            state.identity.isLoggedIn = false;
            state.identity.userName = state.identity.rememberUserName ?
                state.identity.userName :
                null;
            break;
    }

    return state;
}

export default SecurityReducer;