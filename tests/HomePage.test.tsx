import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../src/pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('HomePage Component Tests', () => {
  beforeEach(() => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );
  });

  it('should display the main heading', () => {
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(
      'Добро пожаловать в приложение для управления',
    );
  });

  it('should contain correct styling for the main heading', () => {
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveStyle({
      padding: '35px',
      color: '#022140',
      fontSize: '36px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    });
  });
});
