class PagingInfo{

    /**
     * A token that can be used to retrieve the next page of search results.
     * @type {string}
     */
    nextToken;
    
    /**
     * A token that can be used to retrieve the previous page of search results.
     * @type {string}
     */
    previousToken;
    
    /**
     * The total number of records. This is optional may not be returned by some apis.
     * @type {number}
     */
    total;

    static createFromResponse(response){
        return null;
    } 
}