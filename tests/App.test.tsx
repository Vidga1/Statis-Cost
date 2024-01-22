import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App'; // Путь к вашему файлу App

jest.mock('../src/pages/HomePage', () => {
  const HomePageMock = () => <div>Домашняя Страница</div>;
  return HomePageMock;
});
jest.mock('../src/pages/AboutPage', () => {
  const AboutPageMock = () => <div>Страница О Нас</div>;
  return AboutPageMock;
});
jest.mock('../src/pages/LoginPage', () => {
  const LoginPageMock = () => <div>Страница Входа</div>;
  return LoginPageMock;
});
jest.mock('../src/pages/RegisterPage', () => {
  const RegisterPageMock = () => <div>Страница Регистрации</div>;
  return RegisterPageMock;
});
jest.mock('../src/pages/SettingPage', () => {
  const SettingPageMock = () => <div>Страница Настроек</div>;
  return SettingPageMock;
});
jest.mock('../src/pages/MainPage', () => {
  const MainPageMock = () => <div>Главная Страница</div>;
  return MainPageMock;
});
jest.mock('../src/pages/StatsPage', () => {
  const StatsPageMock = () => <div>Страница Статистики</div>;
  return StatsPageMock;
});

describe('App Routing', () => {
  test('рендерит Домашнюю Страницу на маршруте "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Домашняя Страница')).toBeInTheDocument();
  });

  test('рендерит Страницу О Нас на маршруте "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Страница О Нас')).toBeInTheDocument();
  });

  test('рендерит Страницу Входа на маршруте "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Страница Входа')).toBeInTheDocument();
  });

  test('рендерит Страницу Регистрации на маршруте "/register"', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Страница Регистрации')).toBeInTheDocument();
  });

  test('рендерит Страницу Настроек на маршруте "/settings"', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Страница Настроек')).toBeInTheDocument();
  });

  test('рендерит Главную Страницу на маршруте "/main"', () => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Главная Страница')).toBeInTheDocument();
  });

  test('рендерит Страницу Статистики на маршруте "/stats"', () => {
    render(
      <MemoryRouter initialEntries={['/stats']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Страница Статистики')).toBeInTheDocument();
  });

  // Дополнительные тесты...
});
