import { useState }from 'react';
import Container from "../components/Container"
import { TextField, Button } from '@mui/material';

const Auth = () => {
  const [register, setRegister] = useState(false);  

  return (
    <Container>
        <h2>{register ? "REGISTRO": "LOGIN"}</h2>
        <form>
            <TextField fullWidth required label='Email' type='email' margin="normal"/>
            <TextField  fullWidth required label='Contraseña' type='password' margin="normal" />
            <Button type="submit" variant="contained">{register ? "REGISTRARME": "INGRESAR"}</Button>
        </form>
    </Container>
  )
}

export default Auth