import axios, { AxiosResponse } from "axios";
import { IUsuario } from "../Interfaces/IUsuario";
import { IRespuesta } from "../Interfaces/IRespuesta";

export class UsuarioService {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async obtenerUsuarios(): Promise<IUsuario[]> {
        try {
            const response: AxiosResponse<IUsuario[]> = await axios.get<IUsuario[]>(`${this.baseUrl}/api/Usuarios/ObtenerUsuarios`);
            return response.data;
        } catch (error) {
            throw new Error("Error al obtener los usuarios");
        }
    }

    async obtenerUsuario(id: number): Promise<IUsuario | null> {
        try {
            const response: AxiosResponse<IUsuario> = await axios.get<IUsuario>(`${this.baseUrl}/api/Usuarios/ObtenerUsuario/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error al obtener el usuario");
        }
    }

    //async crearUsuario(usuario: IUsuario): Promise<IRespuesta> {
    //    try {
    //        const response: AxiosResponse<IRespuesta> = await axios.post<IRespuesta>(`${this.baseUrl}/api/Usuarios/CrearUsuario`, usuario);
    //        return response.data;
    //    } catch (error) {
    //        throw new Error("Error al crear el usuario");
    //    }
    //}

    //async autenticarUsuario(usuario: IUsuario): Promise<IRespuesta> {
    //    try {
    //        const response: AxiosResponse<IRespuesta> = await axios.post<IRespuesta>(`${this.baseUrl}/api/Usuarios/UsuarioAutenticacion`, usuario);
    //        return response.data;
    //    } catch (error) {
    //        throw new Error("Error al autenticar el usuario");
    //    }
    //}

    async actualizarUsuario(id: number, usuario: IUsuario): Promise<void> {
        try {
            await axios.put<void>(`${this.baseUrl}/api/Usuarios/ActualizarUsuario/${id}`, usuario);
        } catch (error) {
            throw new Error("Error al actualizar el usuario");
        }
    }

    async eliminarUsuario(id: number): Promise<IRespuesta> {
        try {
            const response: AxiosResponse<IRespuesta> = await axios.delete<IRespuesta>(`${this.baseUrl}/api/Usuarios/EliminarUsuario/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error al eliminar el usuario");
        }
    }
}