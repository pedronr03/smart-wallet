import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../../images/pngwing.com.png';
import styles from './WalletPage.module.css';
import { fetchCurrencies, fetchExchange, editExpense, deleteExpense } from '../../redux/actions';

const INITIAL_STATE = {
  currency: 'USD',
  description: '',
  value: '',
  method: 'Credit card',
  tag: 'Entertainment',
};

class WalletPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      methods: ['Credit card', 'Debit card', 'Money'],
      tags: ['Entertainment', 'Food', 'Health', 'Transportation', 'Work', 'Other'],
      id: 0,
      targetEdit: null,
      targetDetails: null,
      ...INITIAL_STATE,
    };
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChanges = ({ target }) => this.setState({ [target.id]: target.value });

  setNewForm = ({ edit }, editForm) => edit ? null : editForm;

  alternateButton = (targetEdit) => {
    const { expenses } = this.props;
    const item = expenses.find((expense) => expense.id === targetEdit);
    const { description, method, currency, tag, value } = item;
    const editForm = { description, method, currency, tag, value };
    this.setState((prev) => {
      const verify = prev.edit ? null : editForm;
      return {
        edit: !prev.edit,
        ...INITIAL_STATE,
        targetEdit: prev.edit ? null : targetEdit,
        ...verify
      }
    });
  }

  delete = (id) => {
    const { deleteExpenseAction } = this.props;
    const { targetEdit } = this.state;
    if (targetEdit === id) this.setState({ ...INITIAL_STATE, edit: false });
    deleteExpenseAction(id);
  }

  openDetails = (id) => {
    const { expenses } = this.props;
    const targetDetails = expenses.find((expense) => expense.id === id);
    this.setState({ targetDetails, })
  }

  closeDetails = () => this.setState({ targetDetails: null });

  setExpense = () => {
    const { description, method, currency, tag, value, id } = this.state;
    const { setExpenseAction } = this.props;
    const payload = { description, method, currency, tag, value, id };
    setExpenseAction(payload);
    this.setState((prev) => ({ ...INITIAL_STATE, id: prev.id + 1 }));
  }

  setEdit = () => {
    const { description, method, currency, tag, value, targetEdit } = this.state;
    const { setChangesAction } = this.props;
    const changes = { description, method, currency, tag, value, id: targetEdit };
    setChangesAction(changes);
    this.setState((prev) => ({ edit: !prev.edit, ...INITIAL_STATE, targetEdit: null }));
  }

  render() {
    const { email, currencies, total, expenses } = this.props;
    const { methods, tags, description, method, currency, tag, value, edit, targetDetails } = this.state;
    const MIN_VALUE = 0.1;
    return (
      <div>
        {
          targetDetails !== null
            ? (
              <div className={ styles.details }>
                <i
                  className="fa-solid fa-xmark"
                  onClick={ this.closeDetails }
                />
                <div>
                  <div className={ `${targetDetails.tag} cardBackground` }>
                    <div className={ `${targetDetails.tag}Tag tagItem` }>
                      <p>{ targetDetails.tag }</p>
                    </div>
                  </div>
                  <div>
                    <h2>{ targetDetails.description }</h2>
                    <p>Payment method: { targetDetails.method }</p>
                    <p>Currency: { `${targetDetails.exchangeRates[targetDetails.currency].name}` }</p>
                    <p>Exchange used: { Number(targetDetails.exchangeRates[targetDetails.currency].ask).toFixed(2) }</p>
                    <p>Value: { Number(targetDetails.value).toFixed(2) }</p>
                    <p>{
                      `Converted value: 
                        ${(targetDetails.value * targetDetails.exchangeRates[targetDetails.currency].ask).toFixed(2)}`
                      }
                    </p>
                    <p>Conversion currency: BRL</p>
                  </div>
                </div>
              </div>
            )
            : null
        }
        <header className={ styles.header }>
          <div>
            <img src={ logo } alt="logo" />
            <h3>Smart Wallet</h3>
          </div>
          <div>
            <div>
              <p data-testid="total-field">{ `Total: ${total.toFixed(2)}` }</p>
              <p data-testid="header-currency-field">Currency: BRL</p>
            </div>
            <div>
              <i className="fa-solid fa-user" />
              <p data-testid="email-field">{ email || 'Visitor' }</p>
            </div>
          </div>
        </header>
        <main className={ styles.main }>
          <div className={ styles.form }>
            <label htmlFor="valor">
              Value:
              <input
                type="number"
                data-testid="value-input"
                value={ value }
                id="value"
                onChange={ this.handleChanges }
              />
            </label>
            <label htmlFor="description">
              Description:
              <input
                type="text"
                data-testid="description-input"
                value={ description }
                id="description"
                onChange={ this.handleChanges }
              />
            </label>
            <label htmlFor="currency">
              Currency:
              <select
                data-testid="currency-input"
                value={ currency }
                id="currency"
                onChange={ this.handleChanges }
              >
                {
                  currencies.map((currencyItem, index) => (
                    <option key={ index }>{ currencyItem }</option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="method">
              Payment method:
              <select
                data-testid="method-input"
                value={ method }
                id="method"
                onChange={ this.handleChanges }
              >
                {
                  methods.map((methodItem, index) => (
                    <option key={ index }>{ methodItem }</option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="tag">
              Tag:
              <select
                data-testid="tag-input"
                value={ tag }
                id="tag"
                onChange={ this.handleChanges }
              >
                {
                  tags.map((tagItem, index) => (
                    <option key={ index }>{ tagItem }</option>
                  ))
                }
              </select>
            </label>
            <button
              type="button"
              onClick={ edit ? this.setEdit : this.setExpense }
              disabled={ Number(value) < MIN_VALUE || !description.length }
            >
              { edit ? 'Edit' : 'Add' } expense
            </button>
          </div>
          <div className={ styles.expensesContainer }>
            {
              expenses.map((expense) => (
                <div className={ styles.expenseContainer } key={ expense.id }>
                  <div className={ styles.descriptionTag }>
                    <p>{ expense.description }</p>
                    <p>{ expense.tag }</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={ () => this.openDetails(expense.id) }
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.alternateButton(expense.id) }
                    >
                      Edit
                    </button>
                    <button
                      onClick={ () => this.delete(expense.id) }
                      type="button"
                      data-testid="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
      </div>
    );
  }
}

WalletPage.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  deleteExpenseAction: propTypes.func.isRequired,
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({})).isRequired,
  getCurrencies: propTypes.func.isRequired,
  setExpenseAction: propTypes.func.isRequired,
  setChangesAction: propTypes.func.isRequired,
  total: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.wallet.expenses
    .reduce(
      (prev, curr) => prev + Number(curr.exchangeRates[curr.currency].ask * curr.value),
      0,
    ),
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (id) => dispatch(deleteExpense(id)),
  setExpenseAction: (payload) => dispatch(fetchExchange(payload)),
  getCurrencies: () => dispatch(fetchCurrencies()),
  setChangesAction: (payload) => dispatch(editExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);
