import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TransactionContext } from "./transactionContext";

// Styled Components
const Wrapper = styled.div`
  max-width: 600px;
  background: #efefef;
  padding: 16px 48px;
  border-radius: 5px;
  box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
`;
const Title = styled.h1`
  text-align: center;
`;
const Balance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin-bottom: 4px;
  }
  & > h3 {
    margin-top: 0;
    font-size: 1.8rem;
  }
`;
const IncomeExpense = styled.div`
  background: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
`;
const Income = styled.div`
  text-align: center;
  flex: 1 1 0;
  & > p {
    margin-bottom: 4px;
  }
  & > h3 {
    margin-top: 0;
  }
`;
const Expense = styled.div`
  text-align: center;
  flex: 1 1 0;
  border-left: 2px solid #efefef;
  & > p {
    margin-bottom: 4px;
  }
  & > h3 {
    margin-top: 0;
  }
`;
const TransactionHistory = styled.div`
  & h3 {
    margin-bottom: 8px;
  }
  & ul {
    list-style-type: none;
    padding-left: 0;
    max-height: 120px;
    overflow-x: hidden;
    overflow-y: auto;
    li {
      display: flex;
      justify-content: space-between;
      background: white;
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
      padding: 8px;
      margin-bottom: 8px;
      border-radius: 4px;
      color: ${(props) => props.color};
    }
  }
`;
const NewTransaction = styled.div`
  & h3 {
    margin-bottom: 8px;
  }
  & form {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 4px;
    }
    input[type="text"],
    input[type="number"] {
      width: 100%;
      margin-bottom: 8px;
      line-height: 2;
      border-radius: 4px;
      border: none;
    }
    input[type="submit"] {
      width: auto;
      align-self: center;
      margin-top: 8px;
      padding: 0.5em 1em;
      background: #fff;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      transition: all 0.3s ease-in-out;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
          0px 3px 14px 2px rgba(0, 0, 0, 0.12),
          0px 5px 5px -3px rgba(0, 0, 0, 0.2);
        background: black;
        color: white;
      }
    }
  }
`;

const App = () => {
  let { transactions, addTransaction } = useContext(TransactionContext);
  let [newDescription, setNewDescription] = useState("");
  let [newAmount, setNewAmount] = useState(0);
  const handleAddition = (event) => {
    event.preventDefault();
    addTransaction({
      description: newDescription,
      amount: Number(newAmount),
    });
    setNewDescription("");
    setNewAmount(0);
  };
  const getIncome = () => {
    let income = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0) income += transactions[i].amount;
    }
    return income;
  };
  const getExpense = () => {
    let expense = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount < 0) expense += transactions[i].amount;
    }
    return expense;
  };

  // Components
  return (
    <Wrapper>
      <Title>Expense Tracker</Title>
      <Balance>
        <p>YOUR BALANCE</p>
        <h3>${getIncome() + getExpense()}</h3>
      </Balance>
      <IncomeExpense>
        <Income>
          <p>INCOME</p>
          <h3>${getIncome()}</h3>
        </Income>
        <Expense>
          <p>EXPENSE</p>
          <h3>${getExpense()}</h3>
        </Expense>
      </IncomeExpense>
      <TransactionHistory>
        <h3>History</h3>
        <hr></hr>
        <ul>
          {transactions.map((object, index) => {
            return (
              <li key={index}>
                <span>{object.description}</span>
                <span>${object.amount}</span>
              </li>
            );
          })}
        </ul>
      </TransactionHistory>
      <NewTransaction>
        <h3>Add New Transaction</h3>
        <hr></hr>
        <form action="" onSubmit={handleAddition}>
          <label htmlFor="">Description</label>
          <input
            value={newDescription}
            type="text"
            placeholder="Enter description"
            onChange={(event) => {
              setNewDescription(event.target.value);
            }}
            required
          />

          <label htmlFor="">Amount</label>
          <input
            value={newAmount}
            type="number"
            placeholder="Enter amount"
            onChange={(event) => {
              setNewAmount(event.target.value);
            }}
            required
          />

          <input type="submit" value="Add Transaction" />
        </form>
      </NewTransaction>
    </Wrapper>
  );
};

export default App;
