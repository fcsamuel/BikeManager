using System;
using BikeManagerAPI.Mapping;
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
            modelBuilder.ApplyConfiguration(new BicicletaMap());

            modelBuilder.ApplyConfiguration(new CategoriaMap());

            modelBuilder.ApplyConfiguration(new ClienteFornecedorMap());

            modelBuilder.ApplyConfiguration(new ContaMap());

            modelBuilder.ApplyConfiguration(new ContatoMap());

            modelBuilder.ApplyConfiguration(new EnderecoMap());

            modelBuilder.ApplyConfiguration(new EstadoMap());

            modelBuilder.ApplyConfiguration(new EstoqueMap());

            modelBuilder.ApplyConfiguration(new FormaPagamentoMap());

            modelBuilder.ApplyConfiguration(new ItemNotaEntradaMap());

            modelBuilder.ApplyConfiguration(new ItemOrcamentoMap());

            modelBuilder.ApplyConfiguration(new ItemOrdemServicoMap());

            modelBuilder.ApplyConfiguration(new MarcaMap());

            modelBuilder.ApplyConfiguration(new MunicipioMap());

            modelBuilder.ApplyConfiguration(new NotaEntradaMap());

            modelBuilder.ApplyConfiguration(new OrcamentoMap());

            modelBuilder.ApplyConfiguration(new OrdemServicoMap());

            modelBuilder.ApplyConfiguration(new PagamentoMap());

            modelBuilder.ApplyConfiguration(new ProdutoMap());

            modelBuilder.ApplyConfiguration(new TabelaPrecoMap());
        }
    }
}
