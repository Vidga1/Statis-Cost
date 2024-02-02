import userReducer, {
  setUser,
  removeUser,
} from '../src/store/slices/userSlice';

jest.mock('../src/firebase/firebase', () => ({
  firestore: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('User reducer', () => {
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      email: null,
      token: null,
      id: null,
    });
  });

  it('should handle setUser', () => {
    const previousState = { email: null, token: null, id: null };
    expect(
      userReducer(
        previousState,
        setUser({
          email: 'test@example.com',
          token: 'token123',
          id: 'user123',
        }),
      ),
    ).toEqual({
      email: 'test@example.com',
      token: 'token123',
      id: 'user123',
    });
  });

  it('should handle removeUser', () => {
    const previousState = {
      email: 'test@example.com',
      token: 'token123',
      id: 'user123',
    };
    expect(userReducer(previousState, removeUser())).toEqual({
      email: null,
      token: null,
      id: null,
    });
  });
});
