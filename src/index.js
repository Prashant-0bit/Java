import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { ToolNameProvider } from './Components/ToolNameContex';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ToolNameProvider>
    <App />
    </ToolNameProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
