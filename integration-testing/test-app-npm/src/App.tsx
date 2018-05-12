import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');
import { Provider } from 'react-redux';
import { createMetatonicReduxThunkApp } from "metatonic-redux"
import * as MetatonicRedux from "metatonic-redux"
import {RestDataStore} from "metatonic-core";
import {defaultComponentRegistry} from "metatonic-core";
import {combineReducers, createStore, applyMiddleware} from "redux";
import {} from "metatonic-redux";
import {
    createAndLoadReactReduxFormForRecord} from "metatonic-react-redux";

let metatonicConfig = {
    dataStore: new RestDataStore('/api'),
    componentRegistry: defaultComponentRegistry
}
let app = createMetatonicReduxThunkApp(metatonicConfig);
let context = app.contexts['default'];

let store = createStore(combineReducers({
    metatonic: context.metatonicReducer
}), applyMiddleware(app.reduxMiddleware));

let [MyForm, formId] = createAndLoadReactReduxFormForRecord(store, context, 'Home', '')

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Provider store={store}>
              <MyForm />
          </Provider>
      </div>
    );
  }
}

export default App;
