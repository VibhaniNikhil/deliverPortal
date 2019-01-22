import axios from 'axios'
import Uri from 'services/Uri'
import ApiInvoker from './ApiInvoker'
import createApiProxy from './ApiClientBuilder'

export default class ApiClient {
    constructor(config = {endpoint: null, callHandlers: null, timeout: null} ){
        this.endpoint = config.endpoint || "/";
        this.axios = axios.create({
            baseURL: this.endpoint,
            timeout: config.timeout || 15000
          });

        var clientCallHandlers = config.callHandlers || [];
        clientCallHandlers.push({
            invoke: async function(request) {
                if (request.params){
                    var queryParams = [];
                    for(var propertyName in request.params) {
                        if(request.params.hasOwnProperty(propertyName)){
                            queryParams[propertyName] = 
                                ApiClient.serializeQueryParameter(request.params[propertyName]);
                        }
                    }

                    request.params = queryParams;
                }

                var response =  await this.axios.request(request);
                return response.data;
            }.bind(this)
        })

        this.invoker = ApiInvoker.chainHandlers(clientCallHandlers);
    }

    static serializeQueryParameter(parameter){
        if(!Array.isArray(parameter)){
            return parameter;
        }

        return parameter.join('|');
    }


    /**
    * Creates a new rest client using a class annotated with ApiFunction attributes  
    * @param {T} client A class annotated with ApiFunctin attributes .
    * @template T
    */
    create(client){
        return createApiProxy(client, this);
    }    

    callService(httpMethod, path, query, body, headers, responseType){        
        var requestHeaders = headers || { };
        headers['Content-Type'] = responseType;

        var request = {
            method: httpMethod.name,
            url: path,
            headers: requestHeaders,
            params: query || { },
            data: body
        };

        return this.invoker.invoke(request);
    }
};