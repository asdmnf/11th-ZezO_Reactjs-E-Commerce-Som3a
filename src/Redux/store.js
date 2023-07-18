import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";


const initialState = {} 

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store