import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import throttle from 'lodash.throttle';
import { fromJS } from 'immutable';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

let store: any;

const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

const initialState = JSON.parse(localStorage.getItem('state')) || {};

if (process.env && process.env.NODE_ENV !== 'production') {
  const composeEnhancers: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, fromJS(initialState), composeEnhancers(applyMiddleware(sagaMiddleware)));
} else {
  store = createStore(rootReducer, fromJS(initialState), compose(applyMiddleware(sagaMiddleware)));
}

sagaMiddleware.run(rootSaga);

store.subscribe(throttle(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
}, 1000));

export { store };
