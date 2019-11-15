using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class EnderecoMap : IEntityTypeConfiguration<Endereco>
    {
        public void Configure(EntityTypeBuilder<Endereco> entity)
        {
            entity.HasKey(e => e.CdEndereco);

            entity.ToTable("endereco");

            entity.Property(e => e.CdEndereco)
                .HasColumnName("cd_endereco")
                .ValueGeneratedNever();

            entity.Property(e => e.CdClienteFornecedor).HasColumnName("cd_clientefornecedor");

            entity.Property(e => e.CdEstado).HasColumnName("cd_estado");

            entity.Property(e => e.CdMunicipio).HasColumnName("cd_municipio");

            entity.Property(e => e.DsComplemento)
                .HasColumnName("ds_complemento")
                .HasMaxLength(14);

            entity.Property(e => e.DsReferencia)
                .HasColumnName("ds_referencia")
                .HasMaxLength(28);

            entity.Property(e => e.DsBairro)
                .HasColumnName("ds_bairro")
                .HasMaxLength(28);

            entity.Property(e => e.DsRua)
                .IsRequired()
                .HasColumnName("ds_rua")
                .HasMaxLength(80);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.NrCep)
                .IsRequired()
                .HasColumnName("nr_cep")
                .HasMaxLength(10);

            entity.Property(e => e.NrNumero)
                .HasColumnName("nr_numero")
                .HasMaxLength(10);

            entity.HasOne(d => d.ClienteFornecedor)
                .WithMany(p => p.EnderecoList)
                .HasForeignKey(d => d.CdClienteFornecedor)
                .HasConstraintName("endereco_cd_clientefornecedor_fkey");

            entity.HasOne(d => d.Municipio)
                .WithMany(p => p.Endereco)
                .HasForeignKey(d => new { d.CdMunicipio, d.CdEstado })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("endereco_cd_municipio_fkey");
        }
    }
}
