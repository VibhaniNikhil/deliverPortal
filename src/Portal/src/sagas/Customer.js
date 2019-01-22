import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import DeliverStatApi from '../services/DeliverStatApi/Index'

function *getCustomer(action){
    let customer = null;

    try{
        yield DeliverStatApi.Customer.getCustomer(
            action.organizationId, 
            action.customerId);
        
    }
    
    return 
}