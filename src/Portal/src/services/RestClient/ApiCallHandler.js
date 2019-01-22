
/**
 * Allows for interception of the request and response of an API call.
 */
export default class ApiCallHandler{

    async invoke(request, next){
        throw new Error('ApiCallHandler::invoke is not implemented.');
    }

}