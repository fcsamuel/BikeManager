using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class FormaPagamentoMap : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> entity)
        {
            entity.HasKey(e => e.CdFormaPagamento);

            entity.ToTable("formapagamento");

            entity.Property(e => e.CdFormaPagamento)
                .HasColumnName("cd_formapagamento")
                .ValueGeneratedNever();

            entity.Property(e => e.DsFormaPagamento)
                .IsRequired()
                .HasColumnName("ds_formapagamento")
                .HasMaxLength(56);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.QtParcelas)
                .HasColumnName("qt_parcelas")
                .HasColumnType("integer");
        }
    }
}
