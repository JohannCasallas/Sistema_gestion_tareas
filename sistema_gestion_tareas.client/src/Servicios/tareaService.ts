import axios, { AxiosResponse } from "axios";
import { ITarea } from "../Interfaces/ITarea";
import { IRespuesta } from "../Interfaces/IRespuesta";

export class TareaService {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async obtenerTareas(): Promise<ITarea[]> {
        try {
            const response: AxiosResponse<ITarea[]> = await axios.get<ITarea[]>(`${this.baseUrl}/api/Tareas/ObtenerTareas`);
            return response.data;
        } catch (error) {
            throw new Error("Error al obtener las tareas");
        }
    }

    async obtenerTarea(id: number): Promise<ITarea | null> {
        try {
            const response: AxiosResponse<ITarea> = await axios.get<ITarea>(`${this.baseUrl}/api/Tareas/ObtenerTarea/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error al obtener la tarea");
        }
    }

    async obtenerTareasPorUsuario(idUsuario: number): Promise<IRespuesta<ITarea[]>> {
        const response: AxiosResponse<IRespuesta<ITarea[]>> = await axios.get<IRespuesta<ITarea[]>>(
            `${this.baseUrl}/api/Tareas/ObtenerTareasPorUsuario/${idUsuario}`);
        return response.data;
    }


    //async crearTarea(tarea: ITarea): Promise<IRespuesta> {
    //    try {
    //        const response: AxiosResponse<IRespuesta> = await axios.post<IRespuesta>(`${this.baseUrl}/api/Tareas/CrearTarea`, tarea);
    //        return response.data;
    //    } catch (error) {
    //        throw new Error("Error al crear la tarea");
    //    }
    //}

    async actualizarTarea(id: number, tarea: ITarea): Promise<void> {
        try {
            await axios.put<void>(`${this.baseUrl}/api/Tareas/ActualizarTarea/${id}`, tarea);
        } catch (error) {
            throw new Error("Error al actualizar la tarea");
        }
    }

    //async eliminarTarea(id: number): Promise<IRespuesta> {
    //    try {
    //        const response: AxiosResponse<IRespuesta<>> = await axios.delete<IRespuesta>(`${this.baseUrl}/api/Tareas/EliminarTarea/${id}`);
    //        return response.data;
    //    } catch (error) {
    //        throw new Error("Error al eliminar la tarea");
    //    }
    //}
}