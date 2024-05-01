using System;
using System.Collections.Generic;

using System;
using System.Collections.Generic;

namespace Sistema_gestion_tareas.Server.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Tareas = new HashSet<Tarea>();
        }

        public int IdUsuario { get; set; }
        public string? NombreUsuario { get; set; }
        public string? ApellidoUsuario { get; set; }
        public string? CorreoElectronico { get; set; }
        public string? Contrasena { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaConexion { get; set; }

        public virtual ICollection<Tarea> Tareas { get; set; }
    }
}
