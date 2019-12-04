using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class NotaEntrada
    {
        public NotaEntrada()
        {
            Estoque = new HashSet<Estoque>();
            ItemNotaEntrada = new HashSet<ItemNotaEntrada>();
        }

        public int CdNotaEntrada { get; set; }
        public int CdConta { get; set; }
        public int CdClienteFornecedor { get; set; }
        public string NrNota { get; set; }
        public string NrSerie { get; set; }
        public bool FgLancada { get; set; }
        public string NrChaveAcesso { get; set; }
        public DateTime DtEmissao { get; set; }
        public decimal VlTotal { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        public ClienteFornecedor ClienteFornecedor { get; set; }
        public Conta Conta { get; set; }
        [JsonIgnore]
        public ICollection<Estoque> Estoque { get; set; }
        public ICollection<ItemNotaEntrada> ItemNotaEntrada { get; set; }
    }
}
