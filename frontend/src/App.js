import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import NotFound from './components/NotFound.jsx'
import Chat from './components/Chat.jsx'
import { ToastContainer } from 'react-toastify' // импортируем ToastContainer из react-toastify
import 'react-toastify/dist/ReactToastify.css' // подключаем стили для react-toastify
import Header from './components/Navbar.jsx'
import { ErrorBoundary } from '@rollbar/react'
import routes from './routes.js'

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = () => !!localStorage.getItem('token')
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <ToastContainer />
        {' '}
        {/* toastContainer из react-toastify */}
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path={routes.root()} element={<PrivateRoute element={Login} />} />
            <Route path={routes.login()} element={<Login />} />
            <Route path={routes.signup()} element={<Signup />} />
            <Route path={routes.notFound()} element={<NotFound />} />
            <Route path={routes.chat()} element={<PrivateRoute element={Chat} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  )
}

export default App
