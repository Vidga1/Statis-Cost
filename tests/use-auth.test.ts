import React from 'react';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../src/hooks/use-auth';
import * as reduxHooks from '../src/hooks/redux-hooks';

describe('useAuth', () => {
  it('should return isAuth as false when no user token', () => {
    jest.spyOn(reduxHooks, 'useAppSelector').mockImplementation(() => ({
      user: {
        token: null,
        email: 'test@example.com',
        id: '123',
      },
    }));
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuth).toBe(false);
  });
});
