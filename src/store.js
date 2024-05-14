import { combineReducers, createStore } from "redux";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      if (state.balance < state.loan) return state;
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
const routeReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(routeReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({type: 'account/requestLoan', payload: {amount: 1000, purpose: 'buy a car'}})
// store.dispatch({ type: "account/payLoan" });

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
store.dispatch(deposit(500));

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
store.dispatch(withdraw(200));

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
store.dispatch(requestLoan(1000, "buy a car"));

function payLoan() {
  return { type: "account/payLoan" };
}
store.dispatch(payLoan());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("elena haran", "12345"));
console.log(store.getState());

store.dispatch(updateName("Elena Haran"));
console.log(store.getState());
