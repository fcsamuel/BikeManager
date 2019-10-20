using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ClienteFornecedorMap : IEntityTypeConfiguration<ClienteFornecedor>
    {
        public void Configure(EntityTypeBuilder<ClienteFornecedor> entity)
        {
            entity.HasKey(e => e.CdClienteFornecedor);

            entity.ToTable("clientefornecedor");

            entity.Property(e => e.CdClienteFornecedor)
                .HasColumnName("cd_clientefornecedor")
                .ValueGeneratedNever();

            entity.Property(e => e.DsFantasia)
                .IsRequired()
                .HasColumnName("ds_fantasia")
                .HasMaxLength(256);

            entity.Property(e => e.DsNomeRazao)
                .IsRequired()
                .HasColumnName("ds_nomerazao")
                .HasMaxLength(256);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtNascimento)
                .HasColumnName("dt_nascimento")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.FgAtivo)
                .HasColumnName("fg_ativo")
                .HasDefaultValueSql("true");

            entity.Property(e => e.NrCpfCnpj)
                .IsRequired()
                .HasColumnName("nr_cpfcnpj")
                .HasMaxLength(20);
        }
    }
}
