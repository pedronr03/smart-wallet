import { GET_CURRENCIES, SET_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSE: {
    const expense = state.expenses.find((exp) => exp.id === action.payload.id);
    const index = state.expenses.indexOf(expense);
    const expenses = [...state.expenses];
    expenses[index] = { ...expenses[index], ...action.payload };
    return {
      ...state,
      expenses,
    };
  }
  default:
    return state;
  }
};

export default wallet;
