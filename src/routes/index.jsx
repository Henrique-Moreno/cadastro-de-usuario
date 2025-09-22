import { Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Principal from '../pages/Principal';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/principal" element={<Principal />} />
    </Routes>
  );
};

export default AppRoutes;