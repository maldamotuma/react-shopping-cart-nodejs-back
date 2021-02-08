import { applyMiddleware,compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducer/productReducers";

const initialState = {};

const store = createStore(combineReducers({
    products: productReducer
}), initialState, compose(applyMiddleware(thunk),window.devToolsExtension()));

export default store;