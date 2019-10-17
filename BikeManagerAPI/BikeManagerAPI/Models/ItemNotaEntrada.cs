using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class ItemNotaEntrada
    {
        public int CdNotaEntrada { get; set; }
        public int CdProduto { get; set; }
        public decimal VlUnitario { get; set; }
        public decimal VlTotal { get; set; }
        public decimal VlCusto { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }

        public NotaEntrada CdNotaEntradaNavigation { get; set; }
        public Produto CdProdutoNavigation { get; set; }
    }
}
