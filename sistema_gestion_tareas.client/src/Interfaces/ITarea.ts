
export interface ITarea {
    idTarea: number;
    idUsuario: number;
    nombreTarea: string;
    descripcionTarea: string;
    nivelTarea: string;
    estadoTarea: boolean;
}

export const ITareaInicial: ITarea = {
    idTarea: 0,
    idUsuario: 0,
    nombreTarea: '',
    descripcionTarea: '',
    nivelTarea: '',
    estadoTarea: false
}