using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class MunicipioMap : IEntityTypeConfiguration<Municipio>
    {
        public void Configure(EntityTypeBuilder<Municipio> entity)
        {
            entity.HasKey(e => new { e.CdMunicipio, e.CdEstado });

            entity.ToTable("municipio");

            entity.Property(e => e.CdMunicipio).HasColumnName("cd_municipio");

            entity.Property(e => e.CdEstado).HasColumnName("cd_estado");

            entity.Property(e => e.DsMunicipio)
                .IsRequired()
                .HasColumnName("ds_municipio")
                .HasMaxLength(36);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.HasOne(d => d.CdEstadoNavigation)
                .WithMany(p => p.Municipio)
                .HasForeignKey(d => d.CdEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("municipio_cd_estado_fkey");
        }
    }
}
