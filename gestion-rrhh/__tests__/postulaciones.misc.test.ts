/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('uuid', () => ({ v4: () => 'uuid-misc' }));
const mockExecutePostulacionesMisc = jest.fn();
jest.mock('@/lib/turso', () => ({ turso: { execute: (...args: any[]) => mockExecutePostulacionesMisc(...args) } }));
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

const { actualizarEstadoPostulacion, descargarCV, eliminarPostulacion } = require('@/app/actions/postulaciones');

describe('postulaciones misc', () => {
  beforeEach(() => mockExecutePostulacionesMisc.mockReset());

  test('actualizarEstadoPostulacion llama update', async () => {
    mockExecutePostulacionesMisc.mockResolvedValue({});
    const res = await actualizarEstadoPostulacion('id1', 'Aceptado');
    expect(res).toEqual({ success: true });
    expect(mockExecutePostulacionesMisc).toHaveBeenCalled();
  });

  test('descargarCV retorna base64 y filename', async () => {
    const buf = Buffer.from('pdfcontent');
    mockExecutePostulacionesMisc.mockResolvedValueOnce({ rows: [{ cv_blob: buf, nombre: 'Pepito' }] });
    const res = await descargarCV('id2');
    expect(res).toHaveProperty('base64');
    expect(res).toHaveProperty('filename');
  });

  test('eliminarPostulacion elimina y responde success', async () => {
    mockExecutePostulacionesMisc.mockResolvedValue({});
    const res = await eliminarPostulacion('id3');
    expect(res).toEqual({ success: true });
  });
});
