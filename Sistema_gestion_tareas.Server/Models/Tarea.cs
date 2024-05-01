using System;
using System.Collections.Generic;

namespace Sistema_gestion_tareas.Server.Models
{
    public partial class Tarea
    {
        public int IdTarea { get; set; }
        public int? IdUsuario { get; set; }
        public string? NombreTarea { get; set; }
        public string? DescripcionTarea { get; set; }
        public string? NivelTarea { get; set; }
        public bool? EstadoTarea { get; set; }

        public virtual Usuario? IdUsuarioNavigation { get; set; }
    }
}
