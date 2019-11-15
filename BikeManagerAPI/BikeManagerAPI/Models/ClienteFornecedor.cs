using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class ClienteFornecedor
    {
        public ClienteFornecedor()
        {
            ContatoList = new HashSet<Contato>();
            EnderecoList = new HashSet<Endereco>();
            NotaEntrada = new HashSet<NotaEntrada>();
            Orcamento = new HashSet<Orcamento>();
        }

        public int CdClienteFornecedor { get; set; }
        public string DsNomeRazao { get; set; }
        public string DsFantasia { get; set; }
        public string NrCpfCnpj { get; set; }
        public string DsTipo { get; set; }
        public bool? FgAtivo { get; set; }
        public DateTime? DtNascimento { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public ICollection<Contato> ContatoList { get; set; }
        public ICollection<Endereco> EnderecoList { get; set; }
        [JsonIgnore]
        public ICollection<NotaEntrada> NotaEntrada { get; set; }
        [JsonIgnore]
        public ICollection<Orcamento> Orcamento { get; set; }
    }
}
