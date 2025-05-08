import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import init from './utils/init.jsx'

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(await init())
}

app()
