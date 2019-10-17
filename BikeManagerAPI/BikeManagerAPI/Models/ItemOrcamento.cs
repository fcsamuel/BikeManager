using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class ItemOrcamento
    {
        public int CdProduto { get; set; }
        public int CdOrcamento { get; set; }
        public int CdTabelaPreco { get; set; }
        public decimal VlUnitario { get; set; }
        public decimal VlTotal { get; set; }
        public int QtProduto { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }

        public Orcamento CdOrcamentoNavigation { get; set; }
        public Produto CdProdutoNavigation { get; set; }
        public TabelaPreco CdTabelaPrecoNavigation { get; set; }
    }
}
