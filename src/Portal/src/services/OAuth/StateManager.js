import AuthToken from './AuthToken'

export default class StateManager{
    /**
     * Gets the authorization token from application state.
     * @returns {AuthToken} The authorization token.
     */
    getToken(){
        throw new Error('StateManager::getAuthToken is not implemented.')
    }

    /**
     * Called when the token is refreshed so the application can update its state.
     * @param {AuthToken} token The new token.
     */
    onTokenRefreshed(token){
        throw new Error('StateManager::onTokenRefreshed is not implemented.')   
    }
}