import moment from 'moment'
import axios from 'axios';
import Uri from 'services/Uri'
import AuthToken from './AuthToken'

export default class OAuthClient {
    constructor(endpoint, clientId, secret, timeout){
        this.endpoint = endpoint;
        this.clientId = clientId;
        this.secret = secret;
        this.axios = axios.create({
            baseURL: this.endpoint,
            timeout: timeout || 15000
          });
    }

    /**
     * Creates a new OAuthClient using AppSettings configuration.
     * @returns {OAuthClient}
     */
    static create(){
        return new OAuthClient(
            AppSettings.OAuth.Endpoint,
            AppSettings.OAuth.ClientId,
            AppSettings.OAuth.ClientSecrent,
            AppSettings.OAuth.Timeout);
    }

    /**
     * Attempts to get a new authorization token using the specified username and password.
     * @param {string} userName The username.
     * @param {*} password The password.
     * @returns {AuthToken} The new authorization token.
     * @throws Throws an exception when their is a failure getting the authorization token.
     */
    async getToken(userName, password){
        let body = {
            'client_id': this.clientId,
            'client_secret': this.secret,
            'grant_type': 'password',
            'username': userName,
            'password': password,
            'scope': 'openid offline_access'
        }

        let request = {
            method: 'POST',
            url: '/connect/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Basic " + btoa(this.clientId + ":" + this.secret)
            },
            data: Uri.createFormFields(body)
        };
                
        let result = await this.axios.request(request);
        return new AuthToken(
            result.data.access_token,
            result.data.refresh_token,
            result.data.expires_in,
            result.data.token_type);
    }

    /**
     * Gets a new token using the refresh token.
     * @param {AuthToken} token The existing token.
     * @returns {AuthToken} The new token.
     */
    async refreshToken(token){
        let body = {
            'client_id': this.clientId,
            'client_secret': this.secret,
            'grant_type': 'refresh_token',
            'refresh_token': token.refreshToken
        }

        var request = {
            method: 'POST',
            url: '/connect/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                "authorization": "Basic " + btoa(this.clientId + ":" + this.secret)
            },
            data: Uri.createFormFields(body)
        }

        let result = await this.axios.request(request);
        return new AuthToken(
            result.token,
            result.refresh_token,
            result.expiry);
    }
}