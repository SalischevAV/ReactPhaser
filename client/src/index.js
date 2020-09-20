import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App.jsx";
import { store } from './redux/reducers/roorReducer';
import { Provider } from 'react-redux';




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById("root")
);