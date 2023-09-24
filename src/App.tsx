import Header from './components/Header'
import { UserProvider } from './contexts/UserContext'
import Formulario from './components/Formulario'

const App = () => {



  return (
    <div>
      <UserProvider>
      <Header />
      <Formulario />
      </UserProvider>
    </div>
  )
}

export default App
