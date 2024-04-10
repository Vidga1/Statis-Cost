import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../src/pages/LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../src/store';
import { AnyAction, Store } from 'redux';

type MockStore = ReturnType<
  typeof configureStore<RootState & PersistedState, AnyAction>
>;
type MockStoreEnhanced = Store<RootState & PersistedState, AnyAction>;

describe('LoginPage Component Tests', () => {
  let store: MockStoreEnhanced;
  const mockStore = configureStore<RootState & PersistedState, AnyAction>();

  beforeEach(() => {
    store = mockStore({
      user: {
        email: null,
        token: null,
        id: null,
      },
      categories: {
        categoriesByUserId: {},
      },
      _persist: {
        version: -1,
        rehydrated: false,
      },
    }) as MockStoreEnhanced;
  });

  it('renders NavigationBar component', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>,
    );
  });

  it('renders Login component', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>,
    );
  });
});
