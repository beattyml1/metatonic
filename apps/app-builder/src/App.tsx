import * as React from 'react';
import './App.css';
import 'metatonic-themes/css/default-theme.css'
//import 'foundation-sites/dist/css/foundation.css'
import {primaryReducer} from './Store'
import 'metatonic-react/lib/editors'
import './Editors/WrappedEditors'


import { Provider } from 'react-redux';
import {combineReducers, createStore, } from "redux";
import {} from "metatonic-redux";
import {AppLayoutBound} from "./components/AppLayout/AppLayout";

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
            <img src="favicon.png" className={"m-badge"} />
            <h1 className="App-title">
                Metatonic App Builder
            </h1>
            <a href={"https://www.npmjs.com/search?q=metatonic"}>NPM</a>
            <a href={"https://github.com/beattyml1/metatonic/wiki"}>Docs</a>
            <a href={"https://github.com/beattyml1/metatonic"}>GitHub</a>
        </header>
          <Provider store={store}>
              <AppLayoutBound />
          </Provider>
      </div>
    );
  }
}

export default App;
