import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Chat from "./components/Chat";
import { ToastContainer } from "react-toastify"; // импортируем ToastContainer из react-toastify
import "react-toastify/dist/ReactToastify.css"; // подключаем стили для react-toastify

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />;
}; // 3 пункт - проверка существования токена в локал сторадж

function App() {
  return (
    <div className="App">
      <ToastContainer /> {/* toastContainer из react-toastify */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Login} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="chat" element={<PrivateRoute element={Chat} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
