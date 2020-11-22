import React from 'react';
import './App.css';

// redux
import {
    store,
    persistor
} from './redux/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// routing
import { BrowserRouter } from "react-router-dom";

// custom components
import Base from "./base/Base";

function App() {
  return (
    <div>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Base />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </div>
  );
}

export default App;
