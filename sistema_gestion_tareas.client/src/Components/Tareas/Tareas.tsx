import React from 'react';
import { IUsuario, IUsuarioInicial } from '../../Interfaces/IUsuario';
import { ITarea } from '../../Interfaces/ITarea';
import { UsuarioService } from '../../Servicios/usuarioService';
import { TareaService } from '../../Servicios/tareaService';
import TareasVista from './tareasVista';


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
            <TareasVista
                alCambiarValorAutocomplete={alCambiarValorAutocomplete}
                obtenerTareasPorUsuario={obtenerTareasPorUsuario}
                isLoading={isLoading}
                usuarios={usuarios}
                tareas={tareas}
            />
        </>
    );
}

export default Tareas;
