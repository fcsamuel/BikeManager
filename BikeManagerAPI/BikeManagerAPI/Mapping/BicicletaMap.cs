using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class BicicletaMap : IEntityTypeConfiguration<Bicicleta>
    {
        public void Configure(EntityTypeBuilder<Bicicleta> entity)
        {
            entity.HasKey(e => new { e.CdBicicleta, e.CdProduto });

            entity.ToTable("bicicleta");

            entity.Property(e => e.CdBicicleta).HasColumnName("cd_bicicleta");

            entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

            entity.Property(e => e.DsBicicleta)
                .IsRequired()
                .HasColumnName("ds_bicicleta")
                .HasMaxLength(256);

            entity.Property(e => e.DsModelo)
                .HasColumnName("ds_modelo")
                .HasMaxLength(128);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.CdProdutoNavigation)
                .WithMany(p => p.Bicicleta)
                .HasForeignKey(d => d.CdProduto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("bicicleta_cd_produto_fkey");
        }
    }
}
