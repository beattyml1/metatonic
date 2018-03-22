import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// React And Redux Setup
import { Provider } from 'react-redux';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../routes';
import { fetchComponentData } from './util/fetchData';
import serverRoutes from './routes';
import serverConfig from './config';

import App from '../components/App'
import '../MetatonicSetup'
import indexPage from './pages/index'

const app = Express()
const port = 3000

declare let __dirname;
declare let process;
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Run Webpack dev server in development mode
if (isDevMode) {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}


//Serve static files
app.use('/static', Express.static('static'))
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api', (req, res, next) => {

});

const renderError = err => {
    const softTab = '&#32;&#32;&#32;&#32;';
    const errTrace = isProdMode ?
        `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
    return indexPage(`Server Error${errTrace}`, {}, isProdMode);
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
    matchPath({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).end(renderError(err));
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
            return next();
        }

        const store = createStore(() => {

        });

        return fetchComponentData(store, renderProps.components, renderProps.params)
            .then(() => {
                const initialView = renderToString(
                    <Provider store={store}>
                        <IntlWrapper>
                        </IntlWrapper>
                    </Provider>
                );
                const finalState = store.getState();

                res
                    .set('Content-Type', 'text/html')
                    .status(200)
                    .end(indexPage(initialView, finalState, isProdMode));
            })
            .catch((error) => next(error));
    });
});

// start app
app.listen(serverConfig.port, (error) => {
    if (!error) {
        console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
    }
});

function handleRender(req, res) {
    // Create a new Redux store instance
    const store = createStore(combineReducers({
        ...{},
        routing: routerReducer
    }))

    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    res.send(indexPage(html, preloadedState))
}