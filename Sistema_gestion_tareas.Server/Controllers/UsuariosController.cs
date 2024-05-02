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
    public class UsuariosController : ControllerBase
    {
        private readonly Sistema_gestion_Tareas_DBContext _context;

        public UsuariosController(Sistema_gestion_Tareas_DBContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet("ObtenerUsuarios")]
        public async Task<ActionResult<IEnumerable<Usuario>>> ObtenerUsuarios()
        {
            try
            {
                var usuarios = await _context.Usuarios.ToListAsync();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener usuarios: {ex.Message}");
            }
        }

        // GET: api/Usuarios/5
        [HttpGet("ObtenerUsuario/{id}")]
        public async Task<ActionResult<Usuario>> ObtenerUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // POST: api/Usuarios
        [HttpPost("CrearUsuario")]
        public async Task<ActionResult<Respuesta>> CrearUsuario(Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return new Respuesta
            {
                Exito = true,
                Mensaje = "Usuario creado exitosamente",
                Datos = usuario
            };
        }

        // POST: api/Usuarios
        [HttpPost("UsuarioAutenticacion")]
        public async Task<ActionResult<Respuesta>> UsuarioAutenticacion(Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var usuarioEncontrado = await _context.Usuarios.FirstOrDefaultAsync(u => 
            u.CorreoElectronico == usuario.CorreoElectronico && u.Contrasena == usuario.Contrasena);

            if (usuarioEncontrado != null)
            {
                return new Respuesta
                {
                    Exito = true,
                    Mensaje = "Usuario autenticado correctamente",
                    Datos = usuarioEncontrado
                };
            }
            else
            {
                return new Respuesta
                {
                    Exito = false,
                    Mensaje = "Correo electrónico o contraseña incorrectos",
                    Datos = null
                };
            }
        }


        // PUT: api/Usuarios/5
        [HttpPut("ActualizarUsuario/{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, Usuario usuario)
        {
            if (id != usuario.IdUsuario)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExiste(id))
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

        // DELETE: api/Usuarios/5
        [HttpDelete("EliminarUsuario/{id}")]
        public async Task<ActionResult<Respuesta>> EliminarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return new Respuesta
            {
                Exito = true,
                Mensaje = "Usuario eliminado exitosamente",
                Datos = usuario
            };
        }

        private bool UsuarioExiste(int id)
        {
            return _context.Usuarios.Any(e => e.IdUsuario == id);
        }
    }
}
