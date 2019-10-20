using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ItemOrcamentoMap : IEntityTypeConfiguration<ItemOrcamento>
    {
        public void Configure(EntityTypeBuilder<ItemOrcamento> entity)
        {
            entity.HasKey(e => new { e.CdProduto, e.CdOrcamento });

            entity.ToTable("itemorcamento");

            entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

            entity.Property(e => e.CdOrcamento).HasColumnName("cd_orcamento");

            entity.Property(e => e.CdTabelaPreco).HasColumnName("cd_tabelapreco");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.QtProduto).HasColumnName("qt_produto");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.VlUnitario)
                .HasColumnName("vl_unitario")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.CdOrcamentoNavigation)
                .WithMany(p => p.ItemOrcamento)
                .HasForeignKey(d => d.CdOrcamento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("produtoorcamento_cd_orcamento_fkey");

            entity.HasOne(d => d.CdProdutoNavigation)
                .WithMany(p => p.ItemOrcamento)
                .HasForeignKey(d => d.CdProduto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("produtoorcamento_cd_produto_fkey");

            entity.HasOne(d => d.CdTabelaPrecoNavigation)
                .WithMany(p => p.ItemOrcamento)
                .HasForeignKey(d => d.CdTabelaPreco)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("produtoorcamento_cd_tabelapreco_fkey");
        }
    }
}
