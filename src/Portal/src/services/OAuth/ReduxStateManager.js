import { store } from 'store'
import AuthToken from './AuthToken'
import StateManager from './StateManager'

export default class ReduxStateManager extends StateManager{
    constructor(actionCreator, selector = null){
        super();
        
        this.actionCreator = actionCreator;
        this.selector = selector || (x => x.auth);
    }

    /**
     * Gets the authorization token from the redux store.
     * @returns {AuthToken} The authorization token.
     */
    getAuthToken(){
        return this.selector(store.getState());
    }

    /**
     * Called when the token is refreshed so the application can update its state.
     * @param {AuthToken} token The new token.
     */
    onTokenRefreshed(token){
        store.dispatch(this.actionCreator(token));
    }
}