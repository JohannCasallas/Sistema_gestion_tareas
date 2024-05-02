import React from 'react';
import { IUsuario, IUsuarioInicial } from '../Interfaces/IUsuario';
import { UsuarioService } from '../Servicios/usuarioService';
import { Autocomplete, Backdrop, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TareaService } from '../Servicios/tareaService';
import { ITarea } from '../Interfaces/ITarea';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Tareas = () => {
    const usuarioService = new UsuarioService('https://localhost:7049');
    const tareaService = new TareaService('https://localhost:7049');
    const [usuarios, setUsuarios] = React.useState<IUsuario[]>([]);
    const [usuario, setUsuario] = React.useState<IUsuario>(IUsuarioInicial);
    const [tareas, setTareas] = React.useState<ITarea[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        setIsLoading(true);
            const response = await usuarioService.obtenerUsuarios();
            setUsuarios(response);
            setIsLoading(false); 
    }

    const obtenerTareasPorUsuario = async () => {
        setIsLoading(true);
        const response = await tareaService.obtenerTareasPorUsuario(usuario.idUsuario);
        setTareas(response);
        setIsLoading(false); 
    }

    const alCambiarValorAutocomplete = (_event: React.SyntheticEvent, newValue: string | null) => {
        const usuarioSeleccionado = usuarios.find(user => user.nombreUsuario === newValue);
        console.log(usuarioSeleccionado)
        if (usuarioSeleccionado) {
            setUsuario(usuarioSeleccionado);
        }
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Autocomplete
                        disablePortal
                        id="NombreUsuario"
                        options={usuarios.map(usuario => usuario.nombreUsuario!)}
                        renderInput={(params) => <TextField {...params} label="Nombre de Usuario" />}
                        onChange={alCambiarValorAutocomplete}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        onClick={obtenerTareasPorUsuario}
                    >
                        Buscar
                    </Button>
                </Grid>
                {tareas.length > 0 && (
                    <Grid item xs={12} >
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tarea</TableCell>
                                        <TableCell>Descripcion</TableCell>
                                        <TableCell>Nivel</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tareas.map((tarea) => (
                                        <TableRow key={tarea.nombreTarea}>
                                            <TableCell>{tarea.nombreTarea}</TableCell>
                                            <TableCell>{tarea.descripcionTarea}</TableCell>
                                            <TableCell>{tarea.nivelTarea}</TableCell>
                                            <TableCell>{tarea.estadoTarea ? 'Finalizada' : 'Abierta'}</TableCell>
                                            <TableCell>
                                                <Button size="small" variant="contained" startIcon={<DeleteIcon />}>
                                                    Eliminar
                                                </Button>
                                                <Button size="small" variant="contained" startIcon={<EditIcon />}>
                                                    Editar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default Tareas;
