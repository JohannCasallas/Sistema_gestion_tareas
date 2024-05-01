export interface IUsuario {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoElectronico: string; 
    contraseña: string;
}

export const IUsuarioInicial: IUsuario = {
    idUsuario: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    correoElectronico: '',
    contraseña:'', 
}