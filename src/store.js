import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";

const routeReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(routeReducer, applyMiddleware(thunk));

export default store;
