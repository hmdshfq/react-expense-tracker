import React, { createContext, useReducer } from "react";
import TransactionReducer from "./transactionReducer";

let initialTransactions = [
  {
    amount: 500,
    description: "Cash",
  },
  {
    amount: -40,
    description: "Book",
  },
  {
    amount: -220,
    description: "Camera",
  },
];

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({ children }) => {
  let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);
  function addTransaction(object) {
    dispatch({
      type: "ADD",
      payload: {
        amount: object.amount,
        description: object.description,
      },
    });
  }
  return (
    <TransactionContext.Provider
      value={{ transactions: state, addTransaction: addTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
