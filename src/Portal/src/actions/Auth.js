import ActionCreator from './ActionCreator'
import AuthToken from 'services/oauth/AuthToken'

export default class AuthActions {

    /**
     * An action for user sign in.
     * @param {string} userName The user name.
     * @param {string} password The password.
     */
    @ActionCreator()
    static signIn(userName, password, rememberUserName) {
        return {
            type: AuthActions.signIn.action,
            payload: {
                userName: userName,
                password: password,
                rememberUserName: rememberUserName
            }
        };
    };

    /**
     * An action indicating the user is signing out.
     */
    @ActionCreator()
    static signOut() {
        return {
            type: AuthActions.signOut.action,
            payload: {}
        };
    };

    /**
     * An action indicating the user authentication token was refreshed.
     * @param {AuthToken} token The updated user token.
     */
    @ActionCreator()
    static tokenRefreshed(token){
        return {
            type: AuthActions.signOut.action,
            payload: token
        };
    }
}
