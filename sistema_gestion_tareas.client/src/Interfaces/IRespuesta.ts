export interface IRespuesta<T> {
    exito: boolean;
    mensaje?: string;
    datos?: T;
}
