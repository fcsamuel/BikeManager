using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class TabelaPreco
    {
        public TabelaPreco()
        {
            ItemOrcamento = new HashSet<ItemOrcamento>();
            ItemOrdemServico = new HashSet<ItemOrdemServico>();
        }

        public int CdTabelaPreco { get; set; }
        public int CdProduto { get; set; }
        public decimal VlVenda { get; set; }
        public decimal NrMargemLucro { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public decimal vlCustoMedio { get; set; }

        public Produto Produto { get; set; }
        [JsonIgnore]
        public ICollection<ItemOrcamento> ItemOrcamento { get; set; }
        [JsonIgnore]
        public ICollection<ItemOrdemServico> ItemOrdemServico { get; set; }
    }
}
