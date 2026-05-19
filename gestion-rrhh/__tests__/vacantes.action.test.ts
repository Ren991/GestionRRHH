/* eslint-disable @typescript-eslint/no-explicit-any */
// Mocks: hacemos que la validación pase y mockeamos `turso.execute` y `uuid`
jest.mock('@/lib/validations', () => ({
  VacanteSchema: {
    safeParse: (data: any) => ({ success: true, data }),
  },
}));

jest.mock('@/lib/turso', () => ({
  turso: {
    execute: jest.fn().mockResolvedValue({ rows: [] }),
  },
}));

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

// Mockeamos `uuid` para evitar importar ESM desde node_modules
jest.mock('uuid', () => ({ v4: () => 'uuid-test' }));
jest.mock('slug', () => ({ __esModule: true, default: (s: string) => `${String(s).toLowerCase().replace(/\s+/g, '-')}` }));

function makeFormData(obj: Record<string, string>) {
  return {
    get: (k: string) => obj[k as keyof typeof obj] ?? null,
  } as unknown as FormData;
}

// Importar la referencia al mock de turso
const tursoModule = require('@/lib/turso');
const mockExecute = tursoModule.turso.execute as jest.Mock;

describe('crearOEditarVacante action', () => {
  beforeEach(() => {
    mockExecute.mockClear();
  });

  test('crea una vacante nueva cuando no existe id', async () => {
    const { crearOEditarVacante } = require('@/app/actions/vacantes');
    const fd = makeFormData({
      titulo: 'QA Tester',
      seniority: 'Junior',
      descripcion: 'Descripción larga para el test',
      fecha_cierre: new Date(Date.now() + 86400000).toISOString(),
    });

    const res = await crearOEditarVacante(null as any, fd);

    expect(res).toEqual({ success: true });
    expect(mockExecute).toHaveBeenCalled();
    const calledWith = mockExecute.mock.calls[0][0];
    expect(calledWith).toHaveProperty('sql');
  });
});

  export {};
