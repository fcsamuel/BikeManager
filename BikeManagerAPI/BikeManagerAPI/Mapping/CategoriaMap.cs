using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class CategoriaMap : IEntityTypeConfiguration<Categoria>
    {
        public void Configure(EntityTypeBuilder<Categoria> entity)
        {
            entity.HasKey(e => e.CdCategoria);

            entity.ToTable("categoria");

            entity.Property(e => e.CdCategoria)
                .HasColumnName("cd_categoria")
                .ValueGeneratedNever();

            entity.Property(e => e.DsCategoria)
                .IsRequired()
                .HasColumnName("ds_categoria")
                .HasMaxLength(28);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");
        }
    }
}
