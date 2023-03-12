import React, { useState } from 'react';
import Container from "../components/Container"
import { TextField, Button, Typography } from '@mui/material';
import { PAuth } from '../components/styles';

const Auth: React.FC = () => {
  // ESTADOS
  const [register, setRegister] = useState<boolean>(false);

  // FUNCIONES
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (register) {
        
      } else {

      };

      console.log();
      
  };

  return (
    <Container>
        <h2>{register ? "REGISTRO": "LOGIN"}</h2>
        <form onSubmit={handleSubmit} className='flex-center'>
          {
            register && <TextField fullWidth required label='Username' type='text' margin="normal"/>
          }
            <TextField fullWidth required label='Email' type='email' margin="normal"/>
            <TextField  fullWidth required label='Contraseña' type='password' margin="normal" />
            <Button style={{margin: "1em auto"}} color='secondary' type="submit" variant="contained">{register ? "REGISTRARME": "INGRESAR"}</Button>
            <PAuth onClick={() => setRegister(!register) }>
              {register ? "Ya tienes una cuenta? Ingresa aqui" : "No tienes una cuenta? Registrate aqui" }</PAuth>
        </form>
    </Container>
  )
};

export default Auth