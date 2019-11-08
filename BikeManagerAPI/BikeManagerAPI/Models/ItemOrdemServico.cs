using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class ItemOrdemServico
    {
        public int CdProduto { get; set; }
        public int CdOrdemServico { get; set; }
        public int CdTabelaPreco { get; set; }
        public decimal VlUnitario { get; set; }
        public decimal VlTotal { get; set; }
        public int QtProduto { get; set; }
        public string DsObservacao { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public OrdemServico OrdemServico { get; set; }
        public Produto Produto { get; set; }
        public TabelaPreco TabelaPreco { get; set; }
    }
}
