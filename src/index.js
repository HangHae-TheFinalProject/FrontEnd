import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import './index.scss';

// redux
import store from './redux/config/configStore';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

Sentry.init({
  dsn: "https://f4db20ad86d44953ac414ad16e1501d5@o4504288722616320.ingest.sentry.io/4504288727334912",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
