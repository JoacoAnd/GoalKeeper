import "./app.css";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import Auth from "./pages/Auth";


const App = () => {
  return <>
    <Nav />
    <Routes>
      <Route path="/auth" element={<Auth />} />

    </Routes>
  </>
}

export default App
