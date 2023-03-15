import "./app.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./components/Nav";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Estadisticas from "./pages/Estadisticas";
import Perfil from "./pages/Perfil";
import OnlyForUser from "./components/OnlyForUser";
import { useAppSelector } from "./redux/hooks";

const App: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  return <>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<OnlyForUser user={user} redirectTo="/auth"/>}>
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <ToastContainer />
  </>
}

export default App
