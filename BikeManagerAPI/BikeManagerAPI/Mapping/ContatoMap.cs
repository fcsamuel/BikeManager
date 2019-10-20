using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ContatoMap : IEntityTypeConfiguration<Contato>
    {
        public void Configure(EntityTypeBuilder<Contato> entity)
        {
            entity.HasKey(e => new { e.CdContato, e.CdClienteFornecedor });

            entity.ToTable("contato");

            entity.Property(e => e.CdContato).HasColumnName("cd_contato");

            entity.Property(e => e.CdClienteFornecedor).HasColumnName("cd_clientefornecedor");

            entity.Property(e => e.DsEmail)
                .HasColumnName("ds_email")
                .HasMaxLength(70);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.NmContato)
                .IsRequired()
                .HasColumnName("nm_contato")
                .HasMaxLength(128);

            entity.Property(e => e.NrNumero)
                .IsRequired()
                .HasColumnName("nr_numero")
                .HasMaxLength(14);

            entity.HasOne(d => d.CdClienteFornecedorNavigation)
                .WithMany(p => p.Contato)
                .HasForeignKey(d => d.CdClienteFornecedor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("contato_cd_clientefornecedor_fkey");
        }
    }
}
