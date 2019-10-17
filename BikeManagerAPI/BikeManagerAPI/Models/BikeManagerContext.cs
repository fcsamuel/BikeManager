using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BikeManagerAPI.Models
{
    public partial class BikeManagerContext : DbContext
    {
        public BikeManagerContext()
        {
        }

        public BikeManagerContext(DbContextOptions<BikeManagerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bicicleta> Bicicleta { get; set; }
        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<ClienteFornecedor> ClienteFornecedor { get; set; }
        public virtual DbSet<Conta> Conta { get; set; }
        public virtual DbSet<Contato> Contato { get; set; }
        public virtual DbSet<Endereco> Endereco { get; set; }
        public virtual DbSet<Estado> Estado { get; set; }
        public virtual DbSet<Estoque> Estoque { get; set; }
        public virtual DbSet<FormaPagamento> FormaPagamento { get; set; }
        public virtual DbSet<ItemNotaEntrada> ItemNotaEntrada { get; set; }
        public virtual DbSet<ItemOrcamento> ItemOrcamento { get; set; }
        public virtual DbSet<ItemOrdemServico> ItemOrdemServico { get; set; }
        public virtual DbSet<Marca> Marca { get; set; }
        public virtual DbSet<Municipio> Municipio { get; set; }
        public virtual DbSet<NotaEntrada> NotaEntrada { get; set; }
        public virtual DbSet<Orcamento> Orcamento { get; set; }
        public virtual DbSet<OrdemServico> OrdemServico { get; set; }
        public virtual DbSet<Pagamento> Pagamento { get; set; }
        public virtual DbSet<Produto> Produto { get; set; }
        public virtual DbSet<TabelaPreco> TabelaPreco { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Server=localhost;Database=bikemanager;Port=5432;User Id=postgres;Password=fcsroot;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bicicleta>(entity =>
            {
                entity.HasKey(e => new { e.CdBicicleta, e.CdProduto });

                entity.ToTable("bicicleta");

                entity.Property(e => e.CdBicicleta).HasColumnName("cd_bicicleta");

                entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

                entity.Property(e => e.DsBicicleta)
                    .IsRequired()
                    .HasColumnName("ds_bicicleta")
                    .HasMaxLength(256);

                entity.Property(e => e.DsModelo)
                    .HasColumnName("ds_modelo")
                    .HasMaxLength(128);

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.Property(e => e.VlTotal)
                    .HasColumnName("vl_total")
                    .HasColumnType("numeric(15,2)");

                entity.HasOne(d => d.CdProdutoNavigation)
                    .WithMany(p => p.Bicicleta)
                    .HasForeignKey(d => d.CdProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("bicicleta_cd_produto_fkey");
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.CdCategoria);

                entity.ToTable("categoria");

                entity.Property(e => e.CdCategoria)
                    .HasColumnName("cd_categoria")
                    .ValueGeneratedNever();

                entity.Property(e => e.DsCategoria)
                    .IsRequired()
                    .HasColumnName("ds_categoria")
                    .HasMaxLength(28);

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<ClienteFornecedor>(entity =>
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
            });

            modelBuilder.Entity<Conta>(entity =>
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
            });

            modelBuilder.Entity<Contato>(entity =>
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
            });

            modelBuilder.Entity<Endereco>(entity =>
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

                entity.HasOne(d => d.CdClienteFornecedorNavigation)
                    .WithMany(p => p.Endereco)
                    .HasForeignKey(d => d.CdClienteFornecedor)
                    .HasConstraintName("endereco_cd_clientefornecedor_fkey");

                entity.HasOne(d => d.Cd)
                    .WithMany(p => p.Endereco)
                    .HasForeignKey(d => new { d.CdMunicipio, d.CdEstado })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("endereco_cd_municipio_fkey");
            });

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.HasKey(e => e.CdEstado);

                entity.ToTable("estado");

                entity.Property(e => e.CdEstado)
                    .HasColumnName("cd_estado")
                    .ValueGeneratedNever();

                entity.Property(e => e.DsEstado)
                    .IsRequired()
                    .HasColumnName("ds_estado")
                    .HasMaxLength(60);

                entity.Property(e => e.DsSigla)
                    .IsRequired()
                    .HasColumnName("ds_sigla")
                    .HasMaxLength(2);

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<Estoque>(entity =>
            {
                entity.HasKey(e => new { e.CdProduto, e.CdNotaEntrada });

                entity.ToTable("estoque");

                entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

                entity.Property(e => e.CdNotaEntrada).HasColumnName("cd_notaentrada");

                entity.Property(e => e.CdEstoque).HasColumnName("cd_estoque");

                entity.Property(e => e.CdOrdemServico).HasColumnName("cd_ordemservico");

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.Property(e => e.NrMaximo)
                    .HasColumnName("nr_maximo")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.NrMinimo)
                    .HasColumnName("nr_minimo")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.QtProduto)
                    .HasColumnName("qt_produto")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.TpLancamento)
                    .IsRequired()
                    .HasColumnName("tp_lancamento")
                    .HasMaxLength(2);

                entity.HasOne(d => d.CdNotaEntradaNavigation)
                    .WithMany(p => p.Estoque)
                    .HasForeignKey(d => d.CdNotaEntrada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("estoque_cd_notaentrada_fkey");

                entity.HasOne(d => d.CdOrdemServicoNavigation)
                    .WithMany(p => p.Estoque)
                    .HasForeignKey(d => d.CdOrdemServico)
                    .HasConstraintName("estoque_cd_ordemservico_fkey");
            });

            modelBuilder.Entity<FormaPagamento>(entity =>
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
            });

            modelBuilder.Entity<ItemNotaEntrada>(entity =>
            {
                entity.HasKey(e => new { e.CdProduto, e.CdNotaEntrada });

                entity.ToTable("itemnotaentrada");

                entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

                entity.Property(e => e.CdNotaEntrada).HasColumnName("cd_notaentrada");

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.Property(e => e.VlCusto)
                    .HasColumnName("vl_custo")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.VlTotal)
                    .HasColumnName("vl_total")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.VlUnitario)
                    .HasColumnName("vl_unitario")
                    .HasColumnType("numeric(15,2)");

                entity.HasOne(d => d.CdNotaEntradaNavigation)
                    .WithMany(p => p.ItemNotaEntrada)
                    .HasForeignKey(d => d.CdNotaEntrada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("itemnotaentrada_cd_notaentrada_fkey");

                entity.HasOne(d => d.CdProdutoNavigation)
                    .WithMany(p => p.ItemNotaEntrada)
                    .HasForeignKey(d => d.CdProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("itemnotaentrada_cd_produto_fkey");
            });

            modelBuilder.Entity<ItemOrcamento>(entity =>
            {
                entity.HasKey(e => new { e.CdProduto, e.CdOrcamento });

                entity.ToTable("itemorcamento");

                entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

                entity.Property(e => e.CdOrcamento).HasColumnName("cd_orcamento");

                entity.Property(e => e.CdTabelaPreco).HasColumnName("cd_tabelapreco");

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.Property(e => e.QtProduto).HasColumnName("qt_produto");

                entity.Property(e => e.VlTotal)
                    .HasColumnName("vl_total")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.VlUnitario)
                    .HasColumnName("vl_unitario")
                    .HasColumnType("numeric(15,2)");

                entity.HasOne(d => d.CdOrcamentoNavigation)
                    .WithMany(p => p.ItemOrcamento)
                    .HasForeignKey(d => d.CdOrcamento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("produtoorcamento_cd_orcamento_fkey");

                entity.HasOne(d => d.CdProdutoNavigation)
                    .WithMany(p => p.ItemOrcamento)
                    .HasForeignKey(d => d.CdProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("produtoorcamento_cd_produto_fkey");

                entity.HasOne(d => d.CdTabelaPrecoNavigation)
                    .WithMany(p => p.ItemOrcamento)
                    .HasForeignKey(d => d.CdTabelaPreco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("produtoorcamento_cd_tabelapreco_fkey");
            });

            modelBuilder.Entity<ItemOrdemServico>(entity =>
            {
                entity.HasKey(e => new { e.CdProduto, e.CdOrdemServico });

                entity.ToTable("itemordemservico");

                entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

                entity.Property(e => e.CdOrdemServico).HasColumnName("cd_ordemservico");

                entity.Property(e => e.CdTabelaPreco).HasColumnName("cd_tabelapreco");

                entity.Property(e => e.DsObservacao)
                    .HasColumnName("ds_observacao")
                    .HasMaxLength(450);

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.Property(e => e.QtProduto).HasColumnName("qt_produto");

                entity.Property(e => e.VlTotal)
                    .HasColumnName("vl_total")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.VlUnitario)
                    .HasColumnName("vl_unitario")
                    .HasColumnType("numeric(15,2)");

                entity.HasOne(d => d.CdOrdemServicoNavigation)
                    .WithMany(p => p.ItemOrdemServico)
                    .HasForeignKey(d => d.CdOrdemServico)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("itemordemservico_cd_ordemservico_fkey");

                entity.HasOne(d => d.CdProdutoNavigation)
                    .WithMany(p => p.ItemOrdemServico)
                    .HasForeignKey(d => d.CdProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("itemordemservico_cd_produto_fkey");

                entity.HasOne(d => d.CdTabelaPrecoNavigation)
                    .WithMany(p => p.ItemOrdemServico)
                    .HasForeignKey(d => d.CdTabelaPreco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("itemordemservico_cd_tabelapreco_fkey");
            });

            modelBuilder.Entity<Marca>(entity =>
            {
                entity.HasKey(e => e.CdMarca);

                entity.ToTable("marca");

                entity.Property(e => e.CdMarca)
                    .HasColumnName("cd_marca")
                    .ValueGeneratedNever();

                entity.Property(e => e.DsMarca)
                    .IsRequired()
                    .HasColumnName("ds_marca")
                    .HasMaxLength(28);

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<Municipio>(entity =>
            {
                entity.HasKey(e => new { e.CdMunicipio, e.CdEstado });

                entity.ToTable("municipio");

                entity.Property(e => e.CdMunicipio).HasColumnName("cd_municipio");

                entity.Property(e => e.CdEstado).HasColumnName("cd_estado");

                entity.Property(e => e.DsMunicipio)
                    .IsRequired()
                    .HasColumnName("ds_municipio")
                    .HasMaxLength(36);

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.HasOne(d => d.CdEstadoNavigation)
                    .WithMany(p => p.Municipio)
                    .HasForeignKey(d => d.CdEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("municipio_cd_estado_fkey");
            });

            modelBuilder.Entity<NotaEntrada>(entity =>
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

                entity.HasOne(d => d.CdClienteFornecedorNavigation)
                    .WithMany(p => p.NotaEntrada)
                    .HasForeignKey(d => d.CdClienteFornecedor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("notaentrada_cd_clientefornecedor_fkey");

                entity.HasOne(d => d.CdContaNavigation)
                    .WithMany(p => p.NotaEntrada)
                    .HasForeignKey(d => d.CdConta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("notaentrada_cd_conta_fkey");
            });

            modelBuilder.Entity<Orcamento>(entity =>
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
            });

            modelBuilder.Entity<OrdemServico>(entity =>
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
            });

            modelBuilder.Entity<Pagamento>(entity =>
            {
                entity.HasKey(e => new { e.CdConta, e.CdFormapagamento });

                entity.ToTable("pagamento");

                entity.Property(e => e.CdConta).HasColumnName("cd_conta");

                entity.Property(e => e.CdFormapagamento).HasColumnName("cd_formapagamento");

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

                entity.HasOne(d => d.CdContaNavigation)
                    .WithMany(p => p.Pagamento)
                    .HasForeignKey(d => d.CdConta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pagamento_cd_conta_fkey");

                entity.HasOne(d => d.CdFormaPagamentoNavigation)
                    .WithMany(p => p.Pagamento)
                    .HasForeignKey(d => d.CdFormapagamento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pagamento_cd_formapagamento_fkey");
            });

            modelBuilder.Entity<Produto>(entity =>
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

                entity.Property(e => e.FgBicicleta).HasColumnName("fg_bicicleta");

                entity.HasOne(d => d.CdCategoriaNavigation)
                    .WithMany(p => p.Produto)
                    .HasForeignKey(d => d.CdCategoria)
                    .HasConstraintName("produto_cd_categoria_fkey");

                entity.HasOne(d => d.CdMarcaNavigation)
                    .WithMany(p => p.Produto)
                    .HasForeignKey(d => d.CdMarca)
                    .HasConstraintName("produto_cd_marca_fkey");
            });

            modelBuilder.Entity<TabelaPreco>(entity =>
            {
                entity.HasKey(e => e.CdTabelaPreco);

                entity.ToTable("tabelapreco");

                entity.Property(e => e.CdTabelaPreco)
                    .HasColumnName("cd_tabelapreco")
                    .ValueGeneratedNever();

                entity.Property(e => e.CdProduto).HasColumnName("cd_produto");

                entity.Property(e => e.DtAlteracao)
                    .HasColumnName("dt_alteracao")
                    .HasColumnType("date");

                entity.Property(e => e.DtRegistro)
                    .HasColumnName("dt_registro")
                    .HasColumnType("date");

                entity.Property(e => e.NrMargemLucro)
                    .HasColumnName("nr_margemlucro")
                    .HasColumnType("numeric(15,2)");

                entity.Property(e => e.VlTotal)
                    .HasColumnName("vl_total")
                    .HasColumnType("numeric(15,2)");

                entity.HasOne(d => d.CdProdutoNavigation)
                    .WithMany(p => p.TabelaPreco)
                    .HasForeignKey(d => d.CdProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tabelapreco_cd_produto_fkey");
            });
        }
    }
}
