export interface IRespuesta {
    exito: boolean;
    mensaje?: string;
    datos?: any;
}


export const IRespuestaInicial: IRespuesta = {
    exito: false,
    mensaje: '',
    datos: [
}