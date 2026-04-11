using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    namespace Domain.Entities;

    public class Vacante
    {
        public int Id { get; set; }

        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;

        public string Ubicacion { get; set; } = string.Empty;
        public string Seniority { get; set; } = string.Empty;

        public bool Activa { get; set; } = true;

        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
        public DateTime? FechaCierre { get; set; }

        public string Slug { get; set; } = string.Empty;
    }
}
