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
import Homepage from "./components/homepage/Homepage";

function App() {
  return (
    <div>
        {/*<Provider store={store}>*/}
        {/*    <PersistGate loading={null} persistor={persistor}>*/}
                <BrowserRouter>
                    <Homepage/>
                </BrowserRouter>
        {/*    </PersistGate>*/}
        {/*</Provider>*/}
    </div>
  );
}

export default App;
