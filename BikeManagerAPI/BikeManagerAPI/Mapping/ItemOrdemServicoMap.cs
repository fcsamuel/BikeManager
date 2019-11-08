using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ItemOrdemServicoMap : IEntityTypeConfiguration<ItemOrdemServico>
    {
        public void Configure(EntityTypeBuilder<ItemOrdemServico> entity)
        {
            entity.HasKey(e => new { e.CdProduto, e.CdOrdemServico });

            entity.ToTable("itemordemservico");

            entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

            entity.Property(e => e.CdOrdemServico).HasColumnName("cd_ordemservico");

            entity.Property(e => e.CdTabelaPreco).HasColumnName("cd_tabelapreco");

            entity.Property(e => e.DsObservacao)
                .HasColumnName("ds_observacao")
                .HasMaxLength(450);

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

            entity.HasOne(d => d.OrdemServico)
                .WithMany(p => p.ItemOrdemServico)
                .HasForeignKey(d => d.CdOrdemServico)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("itemordemservico_cd_ordemservico_fkey");

            entity.HasOne(d => d.Produto)
                .WithMany(p => p.ItemOrdemServico)
                .HasForeignKey(d => d.CdProduto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("itemordemservico_cd_produto_fkey");

            entity.HasOne(d => d.TabelaPreco)
                .WithMany(p => p.ItemOrdemServico)
                .HasForeignKey(d => d.CdTabelaPreco)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("itemordemservico_cd_tabelapreco_fkey");
        }
    }
}
