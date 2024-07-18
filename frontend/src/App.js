import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Chat from "./components/Chat";

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />;
}; // 3 пункт - проверка существования токена в локал сторадж

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
