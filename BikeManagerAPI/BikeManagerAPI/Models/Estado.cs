using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BikeManagerAPI.Models
{
    public partial class Estado
    {
        public Estado()
        {
            Municipio = new HashSet<Municipio>();
        }

        public int CdEstado { get; set; }
        public string DsEstado { get; set; }
        public string DsSigla { get; set; }
        public DateTime DtRegistro { get; set; }
        public DateTime? DtAlteracao { get; set; }
        [JsonIgnore]
        public ICollection<Municipio> Municipio { get; set; }
    }
}
