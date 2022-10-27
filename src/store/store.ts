import {applyMiddleware, compose, createStore, Middleware} from 'redux';
import logger from 'redux-logger';
import {persistReducer, persistStore, PersistConfig} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {rootReducer} from './root-reducer';
import {rootSaga} from "./root-saga";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()

//WARNING: Khó hiểu ExtendedPersistConfig thật sự
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}
const persistConfig :ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

//WARNING: Khó hiểu RootState thật sự
export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
