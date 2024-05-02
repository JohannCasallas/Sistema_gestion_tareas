import React from 'react';

import {
    Autocomplete,
    Backdrop, Button,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ITarea } from '../../Interfaces/ITarea';
import { IUsuario } from '../../Interfaces/IUsuario';


interface TareasVistaProps {
    alCambiarValorAutocomplete: (_event: React.SyntheticEvent, newValue: string | null) => void;
    obtenerTareasPorUsuario: () => Promise<void>;				
    isLoading: boolean;
    usuarios: IUsuario[];
    tareas: ITarea[] | undefined;				
}

const TareasVista: React.FC<TareasVistaProps> = ({ 
    alCambiarValorAutocomplete,
    obtenerTareasPorUsuario,
    isLoading,
    usuarios,
    tareas
}) => {
    
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
                {tareas && tareas.length > 0 && (
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
                                    {tareas && tareas.map((tarea) => (
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

export default TareasVista;
