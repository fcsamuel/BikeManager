using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class OrdemServico
    {
        public OrdemServico()
        {
            Estoque = new HashSet<Estoque>();
            ItemOrdemServico = new HashSet<ItemOrdemServico>();
        }

        public int CdOrdemServico { get; set; }
        public int CdClienteFornecedor { get; set; }
        public int CdConta { get; set; }
        public string DsBicicleta { get; set; }
        public decimal VlTotal { get; set; }
        public DateTime DtAbertura { get; set; }
        public DateTime? DtPrevConclusao { get; set; }
        public DateTime? DtConclusao { get; set; }
        public string DsObservacao { get; set; }

        public Conta CdContaNavigation { get; set; }
        public ICollection<Estoque> Estoque { get; set; }
        public ICollection<ItemOrdemServico> ItemOrdemServico { get; set; }
    }
}
