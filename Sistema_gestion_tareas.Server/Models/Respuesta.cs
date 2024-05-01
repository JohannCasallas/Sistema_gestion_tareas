namespace Sistema_gestion_tareas.Server.Models
{
    public class Respuesta
    {
        public bool Exito { get; set; }
        public string? Mensaje { get; set; }
        public object? Datos { get; set; }
    }
}
