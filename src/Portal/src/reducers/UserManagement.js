import UserActions from 'actions/User';
import lodashCloneDeep from 'lodash.clonedeep';

const DefaultState = {
    Id: null,
    Avatar: {
        Pending: false,
        Url: null
    },
    Personal: {
        FirstName: null,
        LastName: null,
        PhoneNumbers: null,
        Email: null,
        Address: {
        }
    }
};

const UserReducer = (state = lodashCloneDeep(DefaultState), action) => {
    switch (action.type) {
        case UserActions.getCurrentUser.actionSuccess:
            state = { ...state };
            break; 
        
        case UserActions.Types.Login.successName:
            state = { ...state };
            state.ui.login.pending = false;
            break;

        case UserActions.Types.CredentialsExpired.actionName:
            state = { ...state };
            state.ui.login.pending = false;
            state.ui.login.error.hasError = true;
            state.ui.login.error.message = "Credentials expired. Please login again";
            break;

        case UserActions.Types.Login.failedName:
            state = { ...state };
            state.ui.login.pending = false;
            state.ui.login.error.hasError = true;
            state.ui.login.error.message = action.payload && action.payload.name === "LocationError" ?
                action.payload.message :
                "Invalid username or password.";
            break;

        case UserActions.Types.ForgotPassword.actionName:
            state = { ...state };
            state.ui.forgotPassword = Objects.clone(DefaultState.ui.forgotPassword);
            break;

        case UserActions.Types.SendPasswordReset.actionName:
            state = { ...state };
            state.ui.forgotPassword.pending = true;
            break;

        case UserActions.Types.SendPasswordReset.successName:
            state = { ...state };
            state.ui.forgotPassword.pending = false;
            state.ui.forgotPassword.success = true;
            break;

        case UserActions.Types.SendPasswordReset.failedName:
            state = { ...state };
            state.ui.forgotPassword.pending = false;
            state.ui.forgotPassword.error.hasError = true;
            state.ui.forgotPassword.error.message = "Error requesting password reset.";
            break;

        case UserActions.Types.ClearLoginError.actionName:
            state = { ...state };
            state.ui.login.error.hasError = false;
            state.ui.forgotPassword.error.hasError = false;
            break;

        case UserActions.Types.Logoff.successName:
            state = Objects.clone(DefaultState);
            break;
    }

    return state;
};

export default UserReducer;