using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class OrcamentoMap : IEntityTypeConfiguration<Orcamento>
    {
        public void Configure(EntityTypeBuilder<Orcamento> entity)
        {
            entity.HasKey(e => e.CdOrcamento);

            entity.ToTable("orcamento");

            entity.Property(e => e.CdOrcamento)
                .HasColumnName("cd_orcamento")
                .ValueGeneratedNever();

            entity.Property(e => e.CdClienteFornecedor).HasColumnName("cd_clientefornecedor");

            entity.Property(e => e.DsBicicleta)
                .HasColumnName("ds_bicicleta")
                .HasMaxLength(60);

            entity.Property(e => e.DsObservacao)
                .HasColumnName("ds_observacao")
                .HasMaxLength(450);

            entity.Property(e => e.DtAbertura)
                .HasColumnName("dt_abertura")
                .HasColumnType("date");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtConclusao)
                .HasColumnName("dt_conclusao")
                .HasColumnType("date");

            entity.Property(e => e.DtPrevConclusao)
                .HasColumnName("dt_prevconclusao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.CdClienteFornecedorNavigation)
                .WithMany(p => p.Orcamento)
                .HasForeignKey(d => d.CdClienteFornecedor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orcamento_cd_clientefornecedor_fkey");
        }
    }
}
