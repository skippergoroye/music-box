import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'

import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from './context/StateProvider';
import reducer from './context/reducer';
import { initialState } from './context/initialState';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer} >
         <App />
      </StateProvider>
    </Router>
  </React.StrictMode>,
)
