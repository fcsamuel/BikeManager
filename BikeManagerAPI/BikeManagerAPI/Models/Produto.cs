using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Produto
    {
        public Produto()
        {
            Bicicleta = new HashSet<Bicicleta>();
            ItemNotaEntrada = new HashSet<ItemNotaEntrada>();
            ItemOrcamento = new HashSet<ItemOrcamento>();
            ItemOrdemServico = new HashSet<ItemOrdemServico>();
            TabelaPrecoList = new HashSet<TabelaPreco>();
        }

        public int CdProduto { get; set; }
        public int? CdMarca { get; set; }
        public int? CdCategoria { get; set; }
        public string DsProduto { get; set; }
        public string DsModelo { get; set; }
        public string DsInfAdicionais { get; set; }
        public bool? FgAtivo { get; set; }
        public bool FgBicicleta { get; set; }
        public string FgTipo { get; set; }
        public decimal? VlServico { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public Categoria Categoria { get; set; }
        public Marca Marca { get; set; }
        [JsonIgnore]
        public ICollection<Bicicleta> Bicicleta { get; set; }
        [JsonIgnore]
        public ICollection<ItemNotaEntrada> ItemNotaEntrada { get; set; }
        [JsonIgnore]
        public ICollection<ItemOrcamento> ItemOrcamento { get; set; }
        [JsonIgnore]
        public ICollection<ItemOrdemServico> ItemOrdemServico { get; set; }
        [JsonIgnore]
        public ICollection<TabelaPreco> TabelaPrecoList { get; set; }
    }
}
