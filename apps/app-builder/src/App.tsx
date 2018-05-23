import * as React from 'react';
import './App.css';
import 'metatonic-themes/css/default-theme.css'
//import 'foundation-sites/dist/css/foundation.css'
import {primaryReducer} from './Store'
import 'metatonic-react/lib/editors'

const logo = require('./logo.svg');
import { Provider } from 'react-redux';
import {combineReducers, createStore, } from "redux";
import {} from "metatonic-redux";
import {AppLayoutBound} from "./components/AppLayout";

// let store = createStore(combineReducers({
//     metatonic: context.metatonicReducer
// }), applyMiddleware(app.reduxMiddleware));

// let [MyForm, formId] = createAndLoadReactReduxFormForRecord(store, context, 'Home', '')
let timeTravel =(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
let store = timeTravel ? createStore(primaryReducer, timeTravel) : createStore(primaryReducer);

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
