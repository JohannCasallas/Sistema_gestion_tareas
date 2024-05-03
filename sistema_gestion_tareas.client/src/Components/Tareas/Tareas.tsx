import React from 'react';
import { ITarea, ITareaInicial } from '../../Interfaces/ITarea';
import { IUsuario, IUsuarioInicial } from '../../Interfaces/IUsuario';
import { TareaService } from '../../Servicios/tareaService';
import { UsuarioService } from '../../Servicios/usuarioService';
import TareasVista from './tareasVista';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TareasModal from './tareasModal';


const Tareas = () => {
    const usuarioService = new UsuarioService('https://localhost:7049');
    const tareaService = new TareaService('https://localhost:7049');
    const [usuarios, setUsuarios] = React.useState<IUsuario[]>([]);
    const [usuario, setUsuario] = React.useState<IUsuario>(IUsuarioInicial);
    const [tareas, setTareas] = React.useState<ITarea[]>();
    const [tarea, setTarea] = React.useState<ITarea>(ITareaInicial);
    const [isLoading, setIsLoading] = React.useState(false);
    const [estadoModal, setEstadoModal] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);


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
        if (response.exito) {
            setTareas(response.datos);
            toast.success(response.mensaje!);
        } else {
            setTareas(response.datos);
            toast.error(response.mensaje!);
        }
        setIsLoading(false);
    }


    const alCambiarValorAutocomplete = (_event: React.SyntheticEvent, newValue: string | null) => {
        const usuarioSeleccionado = usuarios.find(user => user.nombreUsuario === newValue);
        if (usuarioSeleccionado) {
            setUsuario(usuarioSeleccionado);
        }
    };

    const alCambiarValor: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setTarea(prevCategoria => ({
            ...prevCategoria,
            [name]: value
        }));
    };

    const manejarModal = (accion: 'creacion' | 'edicion') => {
        setOpen(true);
        if (accion === 'creacion') {
            setEstadoModal(true);
        } else {
            setEstadoModal(false);
        }
    };

    const cerrarModal = () => {
        setOpen(false);
        setTarea(ITareaInicial);
    };

    const manejarClicEdicion = (tarea: ITarea) => {
        setTarea(tarea);
        manejarModal('edicion');
    };


    return (
        <>
            <ToastContainer /> 
            <TareasVista
                alCambiarValorAutocomplete={alCambiarValorAutocomplete}
                obtenerTareasPorUsuario={obtenerTareasPorUsuario}
                manejarClicEdicion={manejarClicEdicion}
                manejarModal={manejarModal}
                isLoading={isLoading}
                usuarios={usuarios}
                tareas={tareas}
            />
            <TareasModal
                alCambiarValor={alCambiarValor}
                cerrarModal={cerrarModal}
                estadoModal={estadoModal}
                tarea={tarea}
                open={open}
            />
        </>
    );
}

export default Tareas;
