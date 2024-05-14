import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({type: 'account/requestLoan', payload: {amount: 1000, purpose: 'buy a car'}})
// store.dispatch({ type: "account/payLoan" });

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

store.dispatch(deposit(500));
console.log(store.getState());

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

store.dispatch(withdraw(200));
console.log(store.getState());

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

store.dispatch(requestLoan(1000, "buy a car"));
console.log(store.getState());

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(payLoan());
console.log(store.getState());
