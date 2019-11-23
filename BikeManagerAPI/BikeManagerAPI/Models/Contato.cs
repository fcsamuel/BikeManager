using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Contato
    {
        public int CdContato { get; set; }
        public int CdClienteFornecedor { get; set; }
        public string NmContato { get; set; }
        public string NrNumero { get; set; }
        public string DsEmail { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        [JsonIgnore]
        public ClienteFornecedor ClienteFornecedor { get; set; }
    }
}
