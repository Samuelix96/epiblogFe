import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import blogsReducerState from "./reducers/blogsReducer"
import authGitSlice from "./reducers/authUserGit"
import commentsBlogs from "./reducers/commentsBlog"

const reducer = combineReducers({
  blogsStore : blogsReducerState,
  auth: authGitSlice,
  comments: commentsBlogs,
})
const store= configureStore({
  reducer,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store= {store}>
    <App />
    </Provider>
  </React.StrictMode>
);


