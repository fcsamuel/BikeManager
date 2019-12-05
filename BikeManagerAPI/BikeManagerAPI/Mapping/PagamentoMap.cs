using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class PagamentoMap : IEntityTypeConfiguration<Pagamento>
    {
        public void Configure(EntityTypeBuilder<Pagamento> entity)
        {
            entity.HasKey(e => e.CdPagamento);

            entity.ToTable("pagamento");

            entity.Property(e => e.CdPagamento)
                .HasColumnName("cd_pagamento")
                .ValueGeneratedNever();

            entity.Property(e => e.CdConta).HasColumnName("cd_conta");

            entity.Property(e => e.CdFormaPagamento).HasColumnName("cd_formapagamento");

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtPagamento)
                .HasColumnName("dt_pagamento")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.VlPago)
                .HasColumnName("vl_pago")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.VlParcela)
                .HasColumnName("vl_parcela")
                .HasColumnType("numeric(15,2)");

            entity.Property(e => e.NrParcela)
                .HasColumnName("nr_parcela")
                .HasColumnType("integer");

            entity.Property(e => e.DtBaixa)
                .HasColumnName("dt_baixa")
                .HasColumnType("date");

            entity.HasOne(d => d.Conta)
                .WithMany(p => p.PagamentoList)
                .HasForeignKey(d => d.CdConta)
                .HasConstraintName("pagamento_cd_conta_fkey");

            entity.HasOne(d => d.FormaPagamento)
                .WithMany(p => p.Pagamento)
                .HasForeignKey(d => d.CdFormaPagamento)
                .HasConstraintName("pagamento_cd_formapagamento_fkey");
        }
    }
}
