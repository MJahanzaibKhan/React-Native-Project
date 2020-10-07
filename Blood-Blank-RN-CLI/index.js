/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react'
import App from './App';
import {name as appName} from './app.json';

// Redux...
import { Provider } from 'react-redux'
import {configureStore, persistor} from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

// const store = configureStore
const RNRedux = () => (
    <Provider store={configureStore}>
        <PersistGate loading={null} persistor={persistor}>
    <App/>
        </PersistGate>
    </Provider>
    )

AppRegistry.registerComponent(appName, () => RNRedux);
