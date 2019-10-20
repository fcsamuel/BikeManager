using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ContaMap : IEntityTypeConfiguration<Conta>
    {
        public void Configure(EntityTypeBuilder<Conta> entity)
        {
            entity.HasKey(e => e.CdConta);

            entity.ToTable("conta");

            entity.Property(e => e.CdConta)
                .HasColumnName("cd_conta")
                .ValueGeneratedNever();

            entity.Property(e => e.DsTipo)
                .IsRequired()
                .HasColumnName("ds_tipo")
                .HasMaxLength(2);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtPagamento)
                .HasColumnName("dt_pagamento")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.DtVencimento)
                .HasColumnName("dt_vencimento")
                .HasColumnType("date");

            entity.Property(e => e.FgPago).HasColumnName("fg_pago");

            entity.Property(e => e.QtParcelas).HasColumnName("qt_parcelas");

            entity.Property(e => e.VlTotal)
                .HasColumnName("vl_total")
                .HasColumnType("numeric(15,2)");
        }
    }
}
