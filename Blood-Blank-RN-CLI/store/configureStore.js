import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage';
import  reducer  from './reducers/root'

const persistConfig = {
    key:'root',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig,reducer)


// const rootReducer = combineReducers({
//     reducer
// })

const configureStore = createStore(persistedReducer)


const persistor = persistStore(configureStore)

export { configureStore,persistor}

// export default store = createStore ( reducer );
