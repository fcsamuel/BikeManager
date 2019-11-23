using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ItemNotaEntradaMap : IEntityTypeConfiguration<ItemNotaEntrada>
    {
        public void Configure(EntityTypeBuilder<ItemNotaEntrada> entity)
        {
            entity.HasKey(e => new { e.CdProduto, e.CdNotaEntrada });

            entity.ToTable("itemnotaentrada");

            entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

            entity.Property(e => e.CdNotaEntrada).HasColumnName("cd_notaentrada");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.VlCusto)
                .HasColumnName("vl_custo")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.VlUnitario)
                .HasColumnName("vl_unitario")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.VlUnitario)
                .HasColumnName("vl_unitario")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.NotaEntrada)
                .WithMany(p => p.ItemNotaEntrada)
                .HasForeignKey(d => d.CdNotaEntrada)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("itemnotaentrada_cd_notaentrada_fkey");

            entity.HasOne(d => d.Produto)
                .WithMany(p => p.ItemNotaEntrada)
                .HasForeignKey(d => d.CdProduto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("itemnotaentrada_cd_produto_fkey");
        }
    }
}
