export interface IUsuario {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoElectronico: string; 
    contrase�a: string;
}

export const IUsuarioInicial: IUsuario = {
    idUsuario: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    correoElectronico: '',
    contrase�a:'', 
}