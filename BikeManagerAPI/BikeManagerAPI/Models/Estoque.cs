using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Estoque
    {
        public int CdEstoque { get; set; }
        public int CdProduto { get; set; }
        public int? CdOrdemServico { get; set; }
        public int? CdNotaEntrada { get; set; }
        public decimal QtProduto { get; set; }
        public decimal VlCusto { get; set; }
        public decimal? VlCustoMedio { get; set; }
        public string TpLancamento { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public NotaEntrada NotaEntrada { get; set; }
        public OrdemServico OrdemServico { get; set; }
    }
}
