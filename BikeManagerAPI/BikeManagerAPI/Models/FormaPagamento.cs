using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class FormaPagamento
    {
        public FormaPagamento()
        {
            Pagamento = new HashSet<Pagamento>();
        }

        public int CdFormaPagamento { get; set; }
        public string DsFormaPagamento { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        [JsonIgnore]
        public ICollection<Pagamento> Pagamento { get; set; }
    }
}
