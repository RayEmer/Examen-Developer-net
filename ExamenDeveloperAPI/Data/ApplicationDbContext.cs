using Microsoft.EntityFrameworkCore;
using ExamenDeveloperAPI.Entities;

namespace ExamenDeveloperAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Tienda> Tiendas { get; set; }
        public DbSet<Articulo> Articulos { get; set; }
        public DbSet<ArticuloTienda> ArticuloTiendas { get; set; }
        public DbSet<ClienteArticulo> ClienteArticulos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ArticuloTienda>()
                .HasKey(at => new { at.ArticuloId, at.TiendaId });

            modelBuilder.Entity<ClienteArticulo>()
                .HasKey(ca => new { ca.ClienteId, ca.ArticuloId });

            modelBuilder.Entity<Articulo>()
                .Property(a => a.Precio)
                .HasColumnType("decimal(18,2)");
        }
    }
}
