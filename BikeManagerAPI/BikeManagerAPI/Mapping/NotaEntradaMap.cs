using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class NotaEntradaMap : IEntityTypeConfiguration<NotaEntrada>
    {
        public void Configure(EntityTypeBuilder<NotaEntrada> entity)
        {
            entity.HasKey(e => e.CdNotaEntrada);

            entity.ToTable("notaentrada");

            entity.Property(e => e.CdNotaEntrada)
                .HasColumnName("cd_notaentrada")
                .ValueGeneratedNever();

            entity.Property(e => e.CdClienteFornecedor).HasColumnName("cd_clientefornecedor");

            entity.Property(e => e.CdConta).HasColumnName("cd_conta");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtEmissao)
                .HasColumnName("dt_emissao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.FgLancada).HasColumnName("fg_lancada");

            entity.Property(e => e.NrChaveAcesso)
                .IsRequired()
                .HasColumnName("nr_chaveacesso")
                .HasMaxLength(44);

            entity.Property(e => e.NrNota)
                .IsRequired()
                .HasColumnName("nr_nota")
                .HasMaxLength(20);

            entity.Property(e => e.NrSerie)
                .IsRequired()
                .HasColumnName("nr_serie")
                .HasMaxLength(6);

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");

            entity.HasOne(d => d.ClienteFornecedor)
                .WithMany(p => p.NotaEntrada)
                .HasForeignKey(d => d.CdClienteFornecedor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("notaentrada_cd_clientefornecedor_fkey");

            entity.HasOne(d => d.Conta)
                .WithMany(p => p.NotaEntrada)
                .HasForeignKey(d => d.CdConta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("notaentrada_cd_conta_fkey");
        }
    }
}
