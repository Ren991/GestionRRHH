using Domain.Entities.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Repository;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Vacante> Vacantes { get; set; }
}