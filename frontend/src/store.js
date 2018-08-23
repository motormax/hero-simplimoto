/* eslint-env browser */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';

export default () => {
// Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();
  history.listen((location, action) => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  });

  // Build the middleware for intercepting and dispatching navigation actions
  const middlewares = [];
  middlewares.push(routerMiddleware(history));

  /* eslint-disable no-underscore-dangle */
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    composeEnhancer(applyMiddleware(...middlewares)),
  );

  return { store, history };
};
