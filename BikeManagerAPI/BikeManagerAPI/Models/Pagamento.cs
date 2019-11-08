using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Pagamento
    {
        public int CdFormapagamento { get; set; }
        public int CdConta { get; set; }
        public decimal VlPago { get; set; }
        public DateTime DtPagamento { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public Conta Conta { get; set; }
        public FormaPagamento FormaPagamento { get; set; }
    }
}
