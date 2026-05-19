/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('uuid', () => ({ v4: () => 'uuid-admin' }));
const mockExecutePostulacionesAdmin = jest.fn().mockResolvedValue({});
jest.mock('@/lib/turso', () => ({ turso: { execute: (...args: any[]) => mockExecutePostulacionesAdmin(...args) } }));
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

const { crearPostulacionAdmin } = require('@/app/actions/postulaciones');

function makeFile(size = 0) { return { size, arrayBuffer: async () => new Uint8Array(size).buffer } as unknown as File; }
function makeFormData(obj: Record<string, any>) { return { get: (k: string) => obj[k as keyof typeof obj] ?? null } as unknown as FormData; }

describe('crearPostulacionAdmin', () => {
  beforeEach(() => mockExecutePostulacionesAdmin.mockClear());

  test('crea manual con CV', async () => {
    const fd = makeFormData({ vacanteId: 'v1', nombre: 'Ana', email: 'a@b.com', puesto: 'Dev', linkedin: '', portfolio: '', ubicacion_candidato: '', remuneracion: '0', cv_archivo: makeFile(1024) });
    const res = await crearPostulacionAdmin(fd);
    expect(res).toEqual({ success: true });
    expect(mockExecutePostulacionesAdmin).toHaveBeenCalled();
  });

  test('crea manual sin CV', async () => {
    const fd = makeFormData({ vacanteId: null, nombre: 'Ana', email: 'a@b.com', puesto: 'Dev', linkedin: '', portfolio: '', ubicacion_candidato: '', remuneracion: '0' });
    const res = await crearPostulacionAdmin(fd);
    expect(res).toEqual({ success: true });
  });
});

export {};
