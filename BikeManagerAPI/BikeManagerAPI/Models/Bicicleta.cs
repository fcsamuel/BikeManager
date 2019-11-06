using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Bicicleta
    {
        public int CdBicicleta { get; set; }
        public int CdProduto { get; set; }
        public string DsBicicleta { get; set; }
        public string DsModelo { get; set; }
        public decimal VlTotal { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public Produto CdProdutoNavigation { get; set; }
    }
}
