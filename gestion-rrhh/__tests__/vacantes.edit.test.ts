/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('uuid', () => ({ v4: () => 'uuid-test' }));
jest.mock('slug', () => ({ __esModule: true, default: (s: string) => `${String(s).toLowerCase().replace(/\s+/g, '-')}` }));
jest.mock('@/lib/validations', () => ({ VacanteSchema: { safeParse: (d: any) => ({ success: true, data: d }) } }));
const mockExecuteVacantesEdit = jest.fn();
jest.mock('@/lib/turso', () => ({ turso: { execute: (...args: any[]) => mockExecuteVacantesEdit(...args) } }));
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

const { crearOEditarVacante } = require('@/app/actions/vacantes');

function makeFormData(obj: Record<string, string>) { return { get: (k: string) => obj[k as keyof typeof obj] ?? null } as unknown as FormData }

describe('crearOEditarVacante edit flow', () => {
  beforeEach(() => mockExecuteVacantesEdit.mockClear());

  test('edita vacante cuando id existe', async () => {
    const fd = makeFormData({ id: 'existing', titulo: 'Titulo', seniority: 'Senior', descripcion: 'Descripcion larga y suficiente', ubicacion: 'Ciudad', fecha_cierre: new Date(Date.now()+86400000).toISOString() });
    const res = await crearOEditarVacante(null as any, fd);
    expect(res).toEqual({ success: true });
    expect(mockExecuteVacantesEdit).toHaveBeenCalled();
    // verificar que se llamó UPDATE (sql string contiene UPDATE)
    const called = mockExecuteVacantesEdit.mock.calls[0][0];
    expect(called.sql && called.sql.includes('UPDATE')).toBe(true);
  });
});

export {};
