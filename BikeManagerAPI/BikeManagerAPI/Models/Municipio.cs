using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Municipio
    {
        public Municipio()
        {
            Endereco = new HashSet<Endereco>();
        }

        public int CdMunicipio { get; set; }
        public int CdEstado { get; set; }
        public string DsMunicipio { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }

        public Estado CdEstadoNavigation { get; set; }
        public ICollection<Endereco> Endereco { get; set; }
    }
}
