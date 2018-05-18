import * as React from 'react';
import './App.css';
//import 'foundation-sites/dist/css/foundation.css'
import {primaryReducer} from './Store'
import 'metatonic-react/lib/editors'

const logo = require('./logo.svg');
import { Provider } from 'react-redux';
import { createMetatonicReduxThunkApp } from "metatonic-redux"
import * as MetatonicRedux from "metatonic-redux"
import {ObjectDataStorage} from "metatonic-core";
import {defaultComponentRegistry} from "metatonic-core";
import {combineReducers, createStore, applyMiddleware} from "redux";
import {} from "metatonic-redux";
import { createAndLoadReactReduxFormForRecord} from "metatonic-react-redux";
import {AppLayoutBound} from "./components/AppLayout";
import {BaseSchema} from "./BuiltInTypes";

// let store = createStore(combineReducers({
//     metatonic: context.metatonicReducer
// }), applyMiddleware(app.reduxMiddleware));

// let [MyForm, formId] = createAndLoadReactReduxFormForRecord(store, context, 'Home', '')

let store = createStore(primaryReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Metatonic App Builder</h1>
        </header>
          <Provider store={store}>
              <AppLayoutBound />
          </Provider>
      </div>
    );
  }
}

export default App;
