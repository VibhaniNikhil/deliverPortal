import ApiClient from 'restClient/ApiClient'
import UserApi from './Api/UserApi'
import CustomerApi from './Api/CustomerApi'
import AuthActions from 'actions/Auth'
import { OAuthClient,  OAuthCallHandler, ReduxStateManager } from 'services/oauth/index'

const oAuthClient = OAuthClient.create();
function createApiClient(){
    let stateManager = new ReduxStateManager(
        x => AuthActions.tokenRefreshed(x),
        x => x.auth.token);
    return new ApiClient({
        endpoint: AppSettings.DeliverStatApi.Endpoint,
        callHandlers: [ new OAuthCallHandler(oAuthClient, stateManager) ]
    });
}

class DeliverStatClient{
    /**
     * The ApiClient.
     * @type {ApiClient}
     */
    ApiClient;
    
    /**
     * The OAuthClient.
     * @type {OAuthClient}
     */
    OAuthClient;
    
    /**
     * Customer API
     * @type {UserApi}
     */
    User;

    /**
     * Customer API
     * @type {CustomerApi}
     */
    Customer;

    constructor(apiClient, oAuthClient){
        this.ApiClient = apiClient;
        this.OAuthClient = oAuthClient;
        this.Customer = this.ApiClient.create(new CustomerApi);
        this.User = this.ApiClient.create(new UserApi);
    }
}

const instance = new DeliverStatClient(createApiClient(), oAuthClient);

export default instance;
