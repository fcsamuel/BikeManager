    using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Orcamento
    {
        public Orcamento()
        {
            ItemOrcamento = new HashSet<ItemOrcamento>();
        }

        public int CdOrcamento { get; set; }
        public int CdClienteFornecedor { get; set; }
        public DateTime DtAbertura { get; set; }
        public DateTime? DtPrevConclusao { get; set; }
        public DateTime? DtConclusao { get; set; }
        public string DsObservacao { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public string DsBicicleta { get; set; }
        public decimal VlTotal { get; set; }
        public ClienteFornecedor ClienteFornecedor { get; set; }
        [JsonIgnore]
        public ICollection<ItemOrcamento> ItemOrcamento { get; set; }
    }
}
