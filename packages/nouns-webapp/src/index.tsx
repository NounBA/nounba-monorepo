import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore, combineReducers, PreloadedState } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { WebSocketProvider } from '@ethersproject/providers';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ApolloProvider, useQuery } from '@apollo/client';
import onDisplayAuction from './state/slices/onDisplayAuction';
import account from './state/slices/account';
import application from './state/slices/application';
import logs from './state/slices/logs';
import firstAuction, { actions } from './state/slices/auction/firstAuction';
import secondAuction, {
  actions as secondAuctionActions,
} from './state/slices/auction/secondAuction';
import { clientFactory, latestAuctionsQuery } from './wrappers/subgraph';
import { useEffect } from 'react';
import pastAuctions, { addPastAuctions } from './state/slices/pastAuctions';
import LogsUpdater from './state/updaters/logs';
import config, { CHAIN_ID, createNetworkHttpUrl } from './config';
import { useAppDispatch, useAppSelector } from './hooks';
import { LanguageProvider } from './i18n/LanguageProvider';
import ChainSubscriber from './components/ChainSubscriber';

import './index.css';

dotenv.config();

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    account,
    application,
    firstAuction,
    secondAuction,
    logs,
    pastAuctions,
    onDisplayAuction,
  });

export default function configureStore(preloadedState: PreloadedState<any>) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  );

  return store;
}

const store = configureStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const supportedChainURLs = {
  [ChainId.Mainnet]: createNetworkHttpUrl('mainnet'),
  [ChainId.Rinkeby]: createNetworkHttpUrl('rinkeby'),
  [ChainId.Hardhat]: 'http://localhost:8545',
};

// prettier-ignore
const useDappConfig = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [CHAIN_ID]: supportedChainURLs[CHAIN_ID],
  },
};

const client = clientFactory(config.app.subgraphApiUri);

const Updaters = () => {
  return (
    <>
      <LogsUpdater />
    </>
  );
};

const PastAuctions: React.FC = () => {
  const latestAuctionId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  const { data } = useQuery(latestAuctionsQuery());
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(addPastAuctions({ data }));
  }, [data, latestAuctionId, dispatch]);

  return <></>;
};

const wsProvider = new WebSocketProvider(config.app.wsRpcUri);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ChainSubscriber
        wsProvider={wsProvider}
        auctionsActions={[
          actions,
          // secondAuctionActions
        ]}
        auctionHouseProxyAddresses={[
          config.addresses.nounsAuctionHouseProxy,
          // config.addresses.nounsAuctionHouseProxy2,
        ]}
      />
      <React.StrictMode>
        <Web3ReactProvider
          getLibrary={
            provider => new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
          }
        >
          <ApolloProvider client={client}>
            <PastAuctions />
            <DAppProvider config={useDappConfig}>
              <LanguageProvider>
                <App />
              </LanguageProvider>
              <Updaters />
            </DAppProvider>
          </ApolloProvider>
        </Web3ReactProvider>
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
