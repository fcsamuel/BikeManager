using BikeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeManagerAPI.Mapping
{
    public class ProdutoMap : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> entity)
        {
            entity.HasKey(e => e.CdProduto);

            entity.ToTable("produto");

            entity.Property(e => e.CdProduto)
                .HasColumnName("cd_produto")
                .ValueGeneratedNever();

            entity.Property(e => e.CdCategoria).HasColumnName("cd_categoria");

            entity.Property(e => e.CdMarca).HasColumnName("cd_marca");

            entity.Property(e => e.DsInfAdicionais)
                .HasColumnName("ds_infadicionais")
                .HasMaxLength(128);

            entity.Property(e => e.DsModelo)
                .HasColumnName("ds_modelo")
                .HasMaxLength(128);

            entity.Property(e => e.DsProduto)
                .IsRequired()
                .HasColumnName("ds_produto")
                .HasMaxLength(256);

            entity.Property(e => e.DtAlteracao)
                .HasColumnName("dt_alteracao")
                .HasColumnType("date");

            entity.Property(e => e.DtRegistro)
                .HasColumnName("dt_registro")
                .HasColumnType("date");

            entity.Property(e => e.FgAtivo)
                .HasColumnName("fg_ativo")
                .HasDefaultValueSql("true");

            entity.Property(e => e.VlServico)
                .HasColumnName("vl_servico")
                .HasColumnType("numeric(15,3)");

            entity.Property(e => e.FgTipo)
                .HasColumnName("fg_tipo")
                .HasMaxLength(1);

            entity.Property(e => e.FgBicicleta).HasColumnName("fg_bicicleta");

            entity.HasOne(d => d.Categoria)
                .WithMany(p => p.Produto)
                .HasForeignKey(d => d.CdCategoria)
                .HasConstraintName("produto_cd_categoria_fkey");

            entity.HasOne(d => d.Marca)
                .WithMany(p => p.Produto)
                .HasForeignKey(d => d.CdMarca)
                .HasConstraintName("produto_cd_marca_fkey");
        }
    }
}
