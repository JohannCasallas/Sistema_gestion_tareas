using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_gestion_tareas.Server.Data;
using Sistema_gestion_tareas.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sistema_gestion_tareas.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TareasController : ControllerBase
    {
        private readonly Sistema_gestion_Tareas_DBContext _context;

        public TareasController(Sistema_gestion_Tareas_DBContext context)
        {
            _context = context;
        }

        // GET: api/Tareas
        [Route("ObtenerTareas")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> ObtenerTareas()
        {
            return await _context.Tareas.Include(t => t.IdUsuarioNavigation).ToListAsync();
        }

        // GET: api/Tareas/5
        [HttpGet("ObtenerTarea/{id}")]
        public async Task<ActionResult<Tarea>> ObtenerTarea(int id)
        {
            var tarea = await _context.Tareas.Include(t => t.IdUsuarioNavigation).FirstOrDefaultAsync(m => m.IdTarea == id);

            if (tarea == null)
            {
                return NotFound();
            }

            return tarea;
        }

        // POST: api/Tareas
        [HttpPost("CrearTarea")]
        public async Task<ActionResult<Respuesta>> CrearTarea(Tarea tarea)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();

            return new Respuesta
            {
                Exito = true,
                Mensaje = "Tarea creada exitosamente",
                Datos = tarea
            };
        }

        // PUT: api/Tareas/5
        [HttpPut("ActualizarTarea/{id}")]
        public async Task<IActionResult> ActualizarTarea(int id, Tarea tarea)
        {
            if (id != tarea.IdTarea)
            {
                return BadRequest();
            }

            _context.Entry(tarea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TareaExiste(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Tareas/5
        [HttpDelete("EliminarTarea/{id}")]
        public async Task<ActionResult<Respuesta>> EliminarTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null)
            {
                return NotFound();
            }

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();

            return new Respuesta
            {
                Exito = true,
                Mensaje = "Tarea eliminada exitosamente",
                Datos = tarea
            };
        }

        private bool TareaExiste(int id)
        {
            return _context.Tareas.Any(e => e.IdTarea == id);
        }
    }
}
