import OAuthClient from './OAuthClient'
import StateManager from './StateManager'
import ApiCallHandler from 'restClient/ApiCallHandler'

export default class OAuthCallHandler extends ApiCallHandler{
    /**
     * Creates a new instance of OAuthCallHandler
     * @param {OAuthClient} client The OAuth client.
     * @param {StateManager} stateManager The state manager
     */
    constructor(client, stateManager){
        super();
        
        this.client = client;
        this.stateManager = stateManager;
    }

    async invoke(request, next){
        let token = this.stateManager.getAuthToken();
        if (token.isExpired()){
            // If the token is expiring attempt to refresh before making the call and 
            // dispatch the token refreshed event so the application state can be updated.
            let newToken = await this.client.refreshToken(token);
            this.stateManager.onTokenRefreshed(newToken);
            token = newToken;
        }

        request.headers["Authorization"] = "Bearer " + token.token;
        return await next(request);
    }
}