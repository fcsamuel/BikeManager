using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class EstadoMap : IEntityTypeConfiguration<Estado>
    {
        public void Configure(EntityTypeBuilder<Estado> entity)
        {
            entity.HasKey(e => e.CdEstado);

            entity.ToTable("estado");

            entity.Property(e => e.CdEstado)
                .HasColumnName("cd_estado")
                .ValueGeneratedNever();

            entity.Property(e => e.DsEstado)
                .IsRequired()
                .HasColumnName("ds_estado")
                .HasMaxLength(60);

            entity.Property(e => e.DsSigla)
                .IsRequired()
                .HasColumnName("ds_sigla")
                .HasMaxLength(2);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");
        }
    }
}
