import { ApiGet, ApiPost, ApiDelete, ApiPut, ApiParameter } from "restClient";

export default class CustomerApi {
    @ApiPost(
        "organizations/{organizationId}/customers",
        ApiParameter.path('organizationId'),
        ApiParameter.json(),
        ApiParameter.query('waitForIndex'))
    createCustomer(organizationId, customer, waitForIndex) { }

    @ApiGet(
        "organizations/{organizationId}/customers/{customerId}",
        ApiParameter.path('organizationId'),
        ApiParameter.path('customerId'),
        ApiParameter.query('includeDeleted'),
        ApiParameter.ifNoneMatch())
    getCustomer(organizationId, customerId, includeDeleted, etag){ }

    @ApiPut(
        "organizations/{organizationId}/customers/{customerId}",
        ApiParameter.path('organizationId'),
        ApiParameter.path('customerId'),
        ApiParameter.json(),
        ApiParameter.ifMatch(),
        ApiParameter.path('waitForWrite'))
    updateCustomer(organizationId, customerId, customer, etag, waitForWrite){
    }

    @ApiDelete(
        "organizations/{organizationId}/customers/{customerId}",
        ApiParameter.path('organizationId'),
        ApiParameter.path('customerId'),
        ApiParameter.ifMatch())
    deleteCustomer(organizationId, customerId, etag) { }

    @ApiGet(
        "organizations/{organizationId}/customers",
        ApiParameter.path('organizationId'),
        ApiParameter.queryMap(),
        ApiParameter.queryMap())
    searchCustomers(organizationId, query, pagingInfo){ }

    @ApiGet(
        "organizations/{organizationId}/suggestions/customers",
        ApiParameter.query('query'),
        ApiParameter.query('maxResults'))
    suggestCustomers(query, maxResults) { }
}