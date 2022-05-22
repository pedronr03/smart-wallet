// ActionCreator

export const LOGIN = 'LOGIN';
export const login = (email) => ({
  type: LOGIN,
  email,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const SET_EXPENSE = 'SET_EXPENSE';
export const setExpense = (payload) => ({
  type: SET_EXPENSE,
  payload,
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

// Thunk

export const fetchCurrencies = () => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await request.json();
  delete json.USDT;
  const keys = Object.keys(json);
  dispatch(getCurrencies(keys));
};

export const fetchExchange = (data) => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await request.json();
  delete exchangeRates.USDT;
  const expense = { ...data, exchangeRates };
  dispatch(setExpense(expense));
};