using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class TabelaPrecoMap : IEntityTypeConfiguration<TabelaPreco>
    {
        public void Configure(EntityTypeBuilder<TabelaPreco> entity)
        {
            entity.HasKey(e => e.CdTabelaPreco);

            entity.ToTable("tabelapreco");

            entity.Property(e => e.CdTabelaPreco)
                .HasColumnName("cd_tabelapreco")
                .ValueGeneratedNever();

            entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.NrMargemLucro)
                .HasColumnName("nr_margemlucro")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.Produto)
                .WithMany(p => p.TabelaPreco)
                .HasForeignKey(d => d.CdProduto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tabelapreco_cd_produto_fkey");
        }
    }
}
