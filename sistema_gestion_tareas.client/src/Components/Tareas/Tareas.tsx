import React from 'react';
import { IUsuario, IUsuarioInicial } from '../Interfaces/IUsuario';
import axios from 'axios';

const Tareas = () => {

    const [usuarios, setUsuarios] = React.useState<IUsuario[]>([]);
    const [usuario, setUsuario] = React.useState<IUsuario>(IUsuarioInicial);

    React.useEffect(() => {
        obtenerUsuarios();
    },[]);


    const obtenerUsuarios = async () => {
        try {
            const respuesta = await axios.get<IUsuario[]>('api/Usuarios/ObtenerUsuarios', {
                baseURL: 'https://localhost:7049/'
            });
            console.log(respuesta.data);
            setUsuarios(respuesta.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    }

    
  return (
    <p>Hello world!</p>
  );
}

export default Tareas;