/* eslint-disable @typescript-eslint/no-explicit-any */
// Mocks comunes
jest.mock('uuid', () => ({ v4: () => 'uuid-post' }));
jest.mock('slug', () => ({ __esModule: true, default: (s: string) => `${String(s).toLowerCase().replace(/\s+/g, '-')}` }));

const mockExecutePostulaciones = jest.fn();
jest.mock('@/lib/turso', () => ({
  turso: {
    execute: (...args: any[]) => mockExecutePostulaciones(...args),
  },
}));

const headersMock: any = {
  _h: { 'x-forwarded-for': '1.2.3.4' },
  get(k: string) { return this._h[k]; },
};
jest.mock('next/headers', () => ({ headers: () => headersMock }));

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

const { enviarPostulacion } = require('@/app/actions/postulaciones');

function makeFile(size = 1024) {
  return { size, arrayBuffer: async () => new Uint8Array(size).buffer } as unknown as File;
}

function makeFormData(obj: Record<string, any>) {
  return {
    get: (k: string) => obj[k as keyof typeof obj] ?? null,
  } as unknown as FormData;
}

describe('enviarPostulacion', () => {
  beforeEach(() => mockExecutePostulaciones.mockReset());

  test('rechaza si ya existe email para la vacante', async () => {
    // Primera query: existingMail rows non-empty
    mockExecutePostulaciones.mockResolvedValueOnce({ rows: [{ id: 'x' }] });

    const fd = makeFormData({ email: 'a@b.com', vacanteId: 'v1' });
    const res = await enviarPostulacion(null as any, fd);
    expect(res).toHaveProperty('error');
  });

  test('limite diario por IP', async () => {
    mockExecutePostulaciones.mockResolvedValueOnce({ rows: [] }) // existingMail
           .mockResolvedValueOnce({ rows: [{ count: 3 }] });

    const fd = makeFormData({ email: 'c@d.com', vacanteId: 'v2' });
    const res = await enviarPostulacion(null as any, fd);
    expect(res).toHaveProperty('error');
  });

  test('rechaza archivo grande', async () => {
    mockExecutePostulaciones.mockResolvedValueOnce({ rows: [] }) // existingMail
               .mockResolvedValueOnce({ rows: [{ count: 0 }] });

    const fd = makeFormData({ email: 'e@f.com', vacanteId: 'v3', cv_archivo: makeFile(5 * 1024 * 1024) });
    const res = await enviarPostulacion(null as any, fd);
    expect(res).toHaveProperty('error');
  });

  test('inserta postulación correctamente', async () => {
    mockExecutePostulaciones.mockResolvedValueOnce({ rows: [] }) // existingMail
           .mockResolvedValueOnce({ rows: [{ count: 0 }] })
           .mockResolvedValueOnce({}); // insert

    const fd = makeFormData({
      vacanteId: 'v4',
      nombre: 'Juan',
      email: 'g@h.com',
      puesto: 'Dev',
      linkedin: '',
      portfolio: '',
      remuneracion: '0',
      cv_archivo: makeFile(1024),
      ubicacion_candidato: 'Lugar'
    });

    const res = await enviarPostulacion(null as any, fd);
    expect(res).toEqual({ success: true });
    expect(mockExecutePostulaciones).toHaveBeenCalled();
  });
});

export {};
