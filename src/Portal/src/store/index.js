import {applyMiddleware, compose, createStore} from 'redux';
import reducers from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import { connectRouter, routerMiddleware} from 'connected-react-router';
import logger from 'redux-logger'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

const store = configureStore();

function configureStore(initialState) {
    const currentStore = createStore(
        connectRouter(history)(reducers),
        initialState,
        compose(applyMiddleware(routerMiddleware(history), ...middlewares)));

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            currentStore.replaceReducer(nextRootReducer);
        });
    }
    return currentStore;
}

export {store, history};
