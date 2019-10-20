using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class OrdemServicoMap : IEntityTypeConfiguration<OrdemServico>
    {
        public void Configure(EntityTypeBuilder<OrdemServico> entity)
        {
            entity.HasKey(e => e.CdOrdemServico);

            entity.ToTable("ordemservico");

            entity.Property(e => e.CdOrdemServico)
                .HasColumnName("cd_ordemservico")
                .ValueGeneratedNever();

            entity.Property(e => e.CdClienteFornecedor).HasColumnName("cd_clientefornecedor");

            entity.Property(e => e.CdConta).HasColumnName("cd_conta");

            entity.Property(e => e.DsBicicleta)
                .HasColumnName("ds_bicicleta")
                .HasMaxLength(60);

            entity.Property(e => e.DsObservacao)
                .HasColumnName("ds_observacao")
                .HasMaxLength(450);

            entity.Property(e => e.DtAbertura)
                .HasColumnName("dt_abertura")
                .HasColumnType("date");

            entity.Property(e => e.DtConclusao)
                .HasColumnName("dt_conclusao")
                .HasColumnType("date");

            entity.Property(e => e.DtPrevConclusao)
                .HasColumnName("dt_prevconclusao")
                .HasColumnType("date");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.CdContaNavigation)
                .WithMany(p => p.OrdemServico)
                .HasForeignKey(d => d.CdConta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ordemservico_cd_conta_fkey");
        }
    }
}
