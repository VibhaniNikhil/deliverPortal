import ActionCreator from './ActionCreator'

export default class UserActions {

    /**
     * An action that indicates the User object of the current user 
     * should be refreshed by calling the user api.
     */
    @ActionCreator()
    static refreshCurrentUser() {
        return {
            type: UserActions.refreshCurrentUser.action,
            payload: {}
        };
    };

    @ActionCreator()
    static updateUser(user){
        
    }
}
