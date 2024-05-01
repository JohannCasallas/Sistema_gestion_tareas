using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Sistema_gestion_tareas.Server.Models;

namespace Sistema_gestion_tareas.Server.Data
{
    public partial class Sistema_gestion_Tareas_DBContext : DbContext
    {
        public Sistema_gestion_Tareas_DBContext()
        {
        }

        public Sistema_gestion_Tareas_DBContext(DbContextOptions<Sistema_gestion_Tareas_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tarea> Tareas { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("DefaultConexion");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => e.IdTarea)
                    .HasName("PK__Tareas__EADE90985EA369A8");

                entity.Property(e => e.DescripcionTarea).HasMaxLength(100);

                entity.Property(e => e.NivelTarea).HasMaxLength(50);

                entity.Property(e => e.NombreTarea).HasMaxLength(50);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Tareas)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Tareas__IdUsuari__4D94879B");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuarios__5B65BF97C8F5E319");

                entity.Property(e => e.ApellidoUsuario).HasMaxLength(50);

                entity.Property(e => e.Contraseña).HasMaxLength(50);

                entity.Property(e => e.CorreoElectronico)
                    .HasMaxLength(70)
                    .HasColumnName("correoElectronico");

                entity.Property(e => e.FechaConexion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreUsuario).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
