import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const rootElement = document.getElementById('root');

const appRoot = (
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);

// Use createRoot from react-dom/client to render the app in React 18
const root = createRoot(rootElement);
root.render(appRoot);
