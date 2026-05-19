/* eslint-disable @typescript-eslint/no-explicit-any */
// Mocks para `jose` y `next/headers`
jest.mock('jose', () => ({
  SignJWT: function () {
    return {
      setProtectedHeader: () => ({ setIssuedAt: () => ({ setExpirationTime: () => ({ sign: async () => 'signed-token' }) }) }),
    } as any;
  },
  jwtVerify: async (token: string, secret: any) => ({ payload: { user: 'admin' } }),
}));

// Polyfill TextEncoder for the test environment (Node/Jest)
if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextEncoder = require('util').TextEncoder;
}

const cookieStore: any = {
  _store: {} as Record<string, any>,
  set(name: string, value: string, opts?: any) { this._store[name] = { value, opts }; },
  get(name: string) { return this._store[name]; },
};

jest.mock('next/headers', () => ({
  cookies: () => cookieStore,
}));

process.env.JWT_SECRET = 'test-secret';
process.env.ADMIN_USER = 'admin';
process.env.ADMIN_PASS = 'pass';

const { login, getSession } = require('@/lib/auth');

describe('auth', () => {
  test('login success sets cookie', async () => {
    const res = await login('admin', 'pass');
    expect(res).toBe(true);
    expect(cookieStore._store['auth_token']).toBeDefined();
  });

  test('getSession returns payload', async () => {
    // Simular que existe cookie
    cookieStore._store['auth_token'] = { value: 'signed-token' };
    const session = await getSession();
    expect(session).toHaveProperty('user', 'admin');
  });
});
