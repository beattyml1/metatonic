import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');
import { Provider } from 'react-redux';
import { createMetatonicReduxThunkApp } from "metatonic-redux"
import * as MetatonicRedux from "metatonic-redux"
import {RestDataStore} from "metatonic-core";
import {defaultComponentRegistry,ObjectDataStorage} from "metatonic-core";
import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import {} from "metatonic-redux";
import {
    createAndLoadReactReduxFormForRecord} from "metatonic-react-redux";
import thunk from 'redux-thunk'
import {BaseSchema} from './BuiltInTypes'
import './models'
import 'metatonic-react/lib/editors'

let metatonicConfig = {
    dataStore: new ObjectDataStorage({ $schema: { types: BaseSchema } }),
    componentRegistry: defaultComponentRegistry
}
let app = createMetatonicReduxThunkApp(metatonicConfig);
let context = app.contexts['default'];
let timeTravel = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(combineReducers({
    metatonic: (s:any,a:any) => context.metatonicReducer(s as any, a as any)
}), compose(applyMiddleware(thunk), timeTravel));

let [MyForm, formId] = createAndLoadReactReduxFormForRecord(store, context, 'House', '')

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Metatonic Example App</h1>
        </header>
          <Provider store={store}>
              <MyForm />
          </Provider>
      </div>
    );
  }
}

export default App;
