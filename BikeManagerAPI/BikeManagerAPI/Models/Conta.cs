using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Conta
    {
        public Conta()
        {
            NotaEntrada = new HashSet<NotaEntrada>();
            OrdemServico = new HashSet<OrdemServico>();
            Pagamento = new HashSet<Pagamento>();
        }

        public int CdConta { get; set; }
        public string DsTipo { get; set; }
        public decimal VlTotal { get; set; }
        public int QtParcelas { get; set; }
        public DateTime DtVencimento { get; set; }
        public DateTime? DtPagamento { get; set; }
        public bool FgPago { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime DtAlteracao { get; set; }

        public ICollection<NotaEntrada> NotaEntrada { get; set; }
        public ICollection<OrdemServico> OrdemServico { get; set; }
        public ICollection<Pagamento> Pagamento { get; set; }
    }
}
