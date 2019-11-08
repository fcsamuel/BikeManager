using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Endereco
    {
        public int CdEndereco { get; set; }
        public int? CdClienteFornecedor { get; set; }
        public int CdMunicipio { get; set; }
        public int CdEstado { get; set; }
        public string NrCep { get; set; }
        public string DsRua { get; set; }
        public string NrNumero { get; set; }
        public string DsBairro { get; set; }
        public string DsReferencia { get; set; }
        public string DsComplemento { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public Municipio Municipio { get; set; }
        public ClienteFornecedor ClienteFornecedor { get; set; }
    }
}
