import React from 'react';
import { IUsuario, IUsuarioInicial } from '../Interfaces/IUsuario';
import { UsuarioService } from '../Servicios/usuarioService';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TareaService } from '../Servicios/tareaService';


const Tareas = () => {
    const usuarioService = new UsuarioService('https://localhost:7049');
    const tareaService = new TareaService('https://localhost:7049');
    const [usuarios, setUsuarios] = React.useState<IUsuario[]>([]);
    const [usuario, setUsuario] = React.useState<IUsuario>(IUsuarioInicial);

    React.useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        const response = await usuarioService.obtenerUsuarios();
        setUsuarios(response)
    }

    const obtenerTareasPorUsuario = async () => {
        const response = await tareaService.obtenerTareasPorUsuario(usuario.idUsuario);
        console.log(response, 'responseobtenerTareasPorUsuario');
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
            </Grid>
        </>
    );
}

export default Tareas;
