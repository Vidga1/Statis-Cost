import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RegisterPage from '../src/pages/RegisterPage';
import { AnyAction, Store } from 'redux';

const mockStore = configureStore();
const store = mockStore({
  user: {
    email: null,
    token: null,
    id: null,
  },
  categories: {
    categoriesByUserId: {},
  },
}) as unknown as Store<unknown, AnyAction>;

describe('RegisterPage', () => {
  it('should render navigation bar and sign up form', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>,
    );

    expect(getByText('Главная')).toBeInTheDocument();
    expect(getByText('О проекте')).toBeInTheDocument();
    expect(getByText('Вход')).toBeInTheDocument();
    expect(getByText('Регистрация')).toBeInTheDocument();
  });
});
