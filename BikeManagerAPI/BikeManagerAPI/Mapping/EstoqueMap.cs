using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class EstoqueMap : IEntityTypeConfiguration<Estoque>
    {
        public void Configure(EntityTypeBuilder<Estoque> entity)
        {
            entity.HasKey(e => new { e.CdProduto, e.CdNotaEntrada });

            entity.ToTable("estoque");

            entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

            entity.Property(e => e.CdNotaEntrada).HasColumnName("cd_notaentrada");

            entity.Property(e => e.CdEstoque).HasColumnName("cd_estoque");

            entity.Property(e => e.CdOrdemServico).HasColumnName("cd_ordemservico");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.QtProduto)
                .HasColumnName("qt_produto")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.TpLancamento)
                .IsRequired()
                .HasColumnName("tp_lancamento")
                .HasMaxLength(2);

            entity.Property(e => e.VlCusto)
                .HasColumnName("vl_custo")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.NotaEntrada)
                .WithMany(p => p.Estoque)
                .HasForeignKey(d => d.CdNotaEntrada)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("estoque_cd_notaentrada_fkey");

            entity.HasOne(d => d.OrdemServico)
                .WithMany(p => p.Estoque)
                .HasForeignKey(d => d.CdOrdemServico)
                .HasConstraintName("estoque_cd_ordemservico_fkey");
        }
    }
}
