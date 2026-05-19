import { VacanteSchema } from '@/lib/validations';

describe('VacanteSchema', () => {
  test('valida un objeto válido', () => {
    const dto = {
      titulo: 'Desarrollador Fullstack',
      seniority: 'Ssr',
      descripcion: 'Descripción suficientemente larga para las pruebas',
      ubicacion: 'Buenos Aires, Argentina',
      fecha_cierre: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    };

    const result = VacanteSchema.safeParse(dto);
    expect(result.success).toBe(true);
  });

  test('rechaza título corto', () => {
    const dto = {
      titulo: 'Dev',
      seniority: 'Junior',
      descripcion: 'Descripción suficientemente larga para las pruebas',
      ubicacion: 'Buenos Aires, Argentina',
      fecha_cierre: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    };
    const result = VacanteSchema.safeParse(dto);
    expect(result.success).toBe(false);
  });
});
