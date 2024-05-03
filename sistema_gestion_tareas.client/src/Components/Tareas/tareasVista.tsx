import React from 'react';

import {
    Autocomplete,
    Backdrop, Button,
    CircularProgress,
    Grid,
    IconButton,
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
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { ITarea } from '../../Interfaces/ITarea';
import { IUsuario } from '../../Interfaces/IUsuario';


interface TareasVistaProps {
    alCambiarValorAutocomplete: (_event: React.SyntheticEvent, newValue: string | null) => void;
    obtenerTareasPorUsuario: () => Promise<void>;	
    manejarModal: (accion: 'creacion' | 'edicion') => void;
    manejarClicEdicion: (tarea: ITarea) => void;
    isLoading: boolean;
    usuarios: IUsuario[];
    tareas: ITarea[] | undefined;				
}

const TareasVista: React.FC<TareasVistaProps> = ({ 
    alCambiarValorAutocomplete,
    obtenerTareasPorUsuario,
    manejarClicEdicion,
    manejarModal,
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
                {/*{tareas && tareas.length > 0 && (*/}
                    <Grid item xs={12} >
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={5} style={{ textAlign: 'right' }}>
                                            <IconButton onClick={() => { }}>
                                                <RefreshIcon />
                                            </IconButton>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            onClick={() => manejarModal('creacion') }
                                        >
                                                Agregar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {}}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        manejarModal('edicion');
                                                        manejarClicEdicion(tarea);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
               {/* )}*/}
            </Grid>
        </>
    );
}

export default TareasVista;
