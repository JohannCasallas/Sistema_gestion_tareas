import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { ITarea } from '../../Interfaces/ITarea';



interface CategoriaModalProps {
    alCambiarValor: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    cerrarModal: () => void;
    estadoModal: boolean;
    open: boolean;
    tarea: ITarea;
}
    

const TareasModal: React.FC<CategoriaModalProps> = ({
    alCambiarValor,
    cerrarModal,
    estadoModal,
    tarea,
    open,
}) => {
    return (
        <Dialog open={open} onClose={cerrarModal}>
            <DialogTitle>{estadoModal === true ? 'Crear Categoría' : 'Editar Categoría'}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ paddingTop: 10, paddingBottom: 20 }}>
                    {estadoModal === true ? 'Por favor, ingrese los detalles de la categoría.' : 'Por favor, edite los detalles de la categoría.'}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombre"
                    name="nombre"
                    label="Nombre Categoría"
                    type="text"
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    value={tarea.nombreTarea}
                    onChange={alCambiarValor}
                />
                <TextField
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="Descripción Categoría"
                    type="text"
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                    value={tarea.nombreTarea}
                    onChange={alCambiarValor}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={cerrarModal} color="primary">
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {}}
                    color="primary"
                    disabled={!tarea.nombreTarea}
                >
                    {estadoModal === true ? 'Crear' : 'Editar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TareasModal;