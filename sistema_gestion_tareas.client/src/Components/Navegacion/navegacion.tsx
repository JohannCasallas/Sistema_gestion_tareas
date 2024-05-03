import { Button, ButtonGroup, Grid } from "@mui/material";
import { Link } from 'react-router-dom';


const Navegacion = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                  <ButtonGroup fullWidth variant="contained" aria-label="Basic button group">
                  <Button component={Link} to="/tareas">Tareas</Button>
                  <Button component={Link} to="/usuarios">Usuarios</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
  );
}

export default Navegacion;