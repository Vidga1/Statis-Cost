import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '../src/pages/AboutPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('AboutPage Component Tests', () => {
  beforeEach(() => {
    render(
      <Router>
        <AboutPage />
      </Router>,
    );
  });

  it('should display the main heading', () => {
    const headingElement = screen.getByRole('heading', { name: /о проекте/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('should display the project description', () => {
    const descriptionElement = screen.getByText(
      /эффективного управления личными финансами/i,
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should display key features of the project', () => {
    const features = [
      /категории и подкатегории расходов/i,
      /учёт расходов по датам/i,
      /сводка расходов/i,
      /гибкий просмотр данных/i,
    ];

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('should contain correct styling for the main heading', () => {
    const headingElement = screen.getByRole('heading', { name: /о проекте/i });
    expect(headingElement).toHaveStyle({
      fontSize: '32px',
      color: '#022140',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    });
  });
});
