import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// * Create three columns: Not Started, In Progress, Completed.
//  * The user should be able to create new cards that can be completed in any of these
//    cards.
//  * The user should be able to drag-and-drop the card across different columns.
//  * The user should be able to view more details about the card by clicking on it.
//  * Show a context menu on right click with an option to duplicate and delete the card.
//  * Use `json-server` as your API
//  * Use `react-dnd`
