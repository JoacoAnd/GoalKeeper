import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginThunk, registerThunk, reset } from '../redux/reducers/auth';
import Container from "../components/Container"
import { TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { PAuth } from '../components/styles';
import { MdOutlineVisibility as Visibility, MdOutlineVisibilityOff as VisibilityOff } from 'react-icons/md';

export type Values = {
  username: string;
  email: string;
  password: string;
};


const Auth: React.FC = () => {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(state => state.auth);

  // ESTADOS
  const [register, setRegister] = useState<boolean>(false);
  const [values, setValues] = useState<Values>({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // FUNCIONES

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (register) {
      dispatch(registerThunk(values));
    } else {
      dispatch(loginThunk(values));
    };
  };

  // USE EFFECT

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    };

    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    };
  }, [user, message, isError, isSuccess, navigate, dispatch ]);
  
  if (isLoading) {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress size={100}/>
      </div>
    )
  }

  return (
    <Container>
      <h2>{register ? "REGISTRO" : "LOGIN"}</h2>
      <form onSubmit={handleSubmit} className='flex-center'>
        {
          register && <TextField required onChange={handleChange} name='username' fullWidth value={values.username} label='Username' type='text' margin="normal" />
        }
        <TextField required onChange={handleChange} name='email' fullWidth value={values.email} label='Email' type='email' margin="normal" />
        <TextField required onChange={handleChange} name='password' fullWidth value={values.password} label='Contraseña' type={!showPassword ? "password" : "text" } margin="normal" InputProps={{ 
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                {!showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}/>
        <Button style={{ margin: "1em auto" }} color='secondary' type="submit" variant="contained">{register ? "REGISTRARME" : "INGRESAR"}</Button>
        <PAuth onClick={() => setRegister(!register)}>
          {register ? "Ya tienes una cuenta? Ingresa aqui" : "No tienes una cuenta? Registrate aqui"}</PAuth>
      </form>
    </Container>
  )
};

export default Auth