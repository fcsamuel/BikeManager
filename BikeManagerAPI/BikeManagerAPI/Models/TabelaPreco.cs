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
        public decimal VlTotal { get; set; }
        public decimal NrMargemLucro { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }

        public Produto CdProdutoNavigation { get; set; }
        public ICollection<ItemOrcamento> ItemOrcamento { get; set; }
        public ICollection<ItemOrdemServico> ItemOrdemServico { get; set; }
    }
}
