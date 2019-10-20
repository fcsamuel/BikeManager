using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class MarcaMap : IEntityTypeConfiguration<Marca>
    {
        public void Configure(EntityTypeBuilder<Marca> entity)
        {
            entity.HasKey(e => e.CdMarca);

            entity.ToTable("marca");

            entity.Property(e => e.CdMarca)
                .HasColumnName("cd_marca")
                .ValueGeneratedNever();

            entity.Property(e => e.DsMarca)
                .IsRequired()
                .HasColumnName("ds_marca")
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
