using System;
using System.Collections.Generic;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [Column("Contraseña")]
        public string? Contrasena { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaConexion { get; set; }
        [JsonIgnore]
        public virtual ICollection<Tarea> Tareas { get; set; }
    }
}
