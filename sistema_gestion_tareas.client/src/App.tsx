import { Route, Routes } from 'react-router-dom';
import './App.css';
import Tareas from './Components/Tareas/Tareas';
import Usuarios from './Components/Usuarios/usuarios';
import { BrowserRouter as Router } from 'react-router-dom';
import Navegacion from './Components/Navegacion/navegacion';
import { Grid } from '@mui/material';



const App = () => {

    return (
        <Router>
            <Grid container>
                <Grid item xs={12}>
                    <Navegacion />
                </Grid>
                <Grid item xs={12}>
                <Routes>
                    <Route path="/" element={<Tareas />} />
                    <Route path="/tareas" element={<Tareas />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    </Routes>
                </Grid>
            </Grid>
        </Router>
    );
}

export default App;